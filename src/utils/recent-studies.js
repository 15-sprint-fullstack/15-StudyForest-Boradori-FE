const STORAGE_KEY = 'recentStudies';
const MAX_COUNT = 6;

// 최근 조회한 스터디 id 목록 (최신순)
export function getRecentStudyIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentStudyId(id) {
  const ids = getRecentStudyIds().filter((item) => String(item) !== String(id));
  ids.unshift(id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_COUNT)));
  } catch {
    // localStorage를 못 쓰는 환경이면 그냥 무시
  }
}
