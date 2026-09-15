import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

// Dependency-only hook harness: execute production hook code without browser/API access.
async function loadHook(path, modules, globals = {}) {
  const slots = [];
  let cursor = 0;
  let effect;
  const react = {
    useState(initial) {
      const i = cursor++;
      if (!(i in slots))
        slots[i] = typeof initial === 'function' ? initial() : initial;
      return [
        slots[i],
        (value) => {
          slots[i] = typeof value === 'function' ? value(slots[i]) : value;
        },
      ];
    },
    useRef(initial) {
      const i = cursor++;
      if (!(i in slots)) slots[i] = { current: initial };
      return slots[i];
    },
    useEffect(fn) {
      effect = fn;
    },
  };
  const context = vm.createContext({ console, ...globals });
  const module = new vm.SourceTextModule(
    await readFile(new URL(path, import.meta.url), 'utf8'),
    { context },
  );
  await module.link((specifier) => {
    const exports = specifier === 'react' ? react : modules[specifier];
    return new vm.SyntheticModule(
      Object.keys(exports),
      function () {
        for (const [name, value] of Object.entries(exports))
          this.setExport(name, value);
      },
      { context },
    );
  });
  await module.evaluate();
  return {
    render(name, ...args) {
      cursor = 0;
      return module.namespace[name](...args);
    },
    effect() {
      return effect();
    },
  };
}
const settle = () => new Promise((resolve) => setImmediate(resolve));

test('timer reports while running and removes periodic/reconnect handlers on pause', async () => {
  let calls = 0;
  let tick;
  let interval;
  let cleared = false;
  const handlers = new Map();
  const events = {
    addEventListener: (name, fn) => handlers.set(name, fn),
    removeEventListener: (name) => handlers.delete(name),
  };
  const h = await loadHook(
    '../src/hooks/useStudyActivity.js',
    {
      '../api/checkAccess': {
        reportStudyActivity: async () => {
          calls++;
        },
        isStudyAccessRequired: () => false,
      },
    },
    {
      setInterval: (fn, ms) => {
        tick = fn;
        interval = ms;
        return 1;
      },
      clearInterval: () => {
        cleared = true;
      },
      window: events,
      document: { ...events, visibilityState: 'visible' },
    },
  );
  h.render('useStudyActivity', 'study', false);
  assert.equal(h.effect(), undefined);
  assert.equal(calls, 0);
  h.render('useStudyActivity', 'study', true);
  const stop = h.effect();
  await settle();
  assert.equal(calls, 1);
  assert.equal(interval, 300000);
  await tick();
  assert.equal(calls, 2);
  stop();
  assert.equal(cleared, true);
  assert.equal(handlers.size, 0);
  await tick();
  assert.equal(calls, 2);
});

test('expired heartbeat stops requesting without interrupting timer', async () => {
  let calls = 0;
  let tick;
  const h = await loadHook(
    '../src/hooks/useStudyActivity.js',
    {
      '../api/checkAccess': {
        reportStudyActivity: async () => {
          calls++;
          throw new Error('expired');
        },
        isStudyAccessRequired: () => true,
      },
    },
    {
      setInterval: (fn) => {
        tick = fn;
        return 1;
      },
      clearInterval: () => {},
      window: { addEventListener() {}, removeEventListener() {} },
      document: { addEventListener() {}, removeEventListener() {} },
    },
  );
  h.render('useStudyActivity', 'study', true);
  h.effect();
  await settle();
  await tick();
  assert.equal(calls, 1);
  assert.match(h.render('useStudyActivity', 'study', true), /인증이 만료/);
});
