import { useState } from 'react';
import { InputContainer, NormalButton } from '#publicComponents';
import BackgroundItem from './BackgroundItem';
import style from './Editor.module.css';

const backgroundList = [
  { background: 1 },
  { background: 2 },
  { background: 3 },
  { background: 4 },
  { background: 5 },
  { background: 6 },
  { background: 7 },
  { background: 8 },
];

const getStringedDate = (targetDate) => {
  // 날짜 -> YYYY-MM-DD
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    id: initData?.id,
    nickname: initData?.nickname ?? '',
    name: initData?.name ?? '',
    description: initData?.description ?? '',
    point: initData?.point ?? 0,
    background: initData?.background ?? 1,
    password: initData?.password ?? '',
    passwordCheck: initData?.password ?? '',
    createdAt: initData?.createdAt ? new Date(initData.createdAt) : new Date(),
  });
  const [errors, setErrors] = useState({});

  const onChangeInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'createdAt') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!input.nickname.trim()) {
      nextErrors.nickname = '닉네임을 입력해 주세요';
    }
    if (!input.name.trim()) {
      nextErrors.name = '스터디 이름을 입력해 주세요';
    }
    if (!input.description.trim()) {
      nextErrors.description = '소개 멘트를 작성해 주세요';
    }
    if (!input.password.trim()) {
      nextErrors.password = '비밀번호를 입력해 주세요';
    }
    if (!input.passwordCheck.trim()) {
      nextErrors.passwordCheck = '비밀번호를 다시 한 번 입력해 주세요';
    } else if (input.password !== input.passwordCheck) {
      nextErrors.passwordCheck = '비밀번호가 일치하지 않습니다';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onClickSubmitButton = () => {
    if (!validate()) {
      return;
    }

    const createdAtStr = getStringedDate(input.createdAt); // 'YYYY-MM-DD'
    onSubmit({
      id: input.id,
      nickname: input.nickname,
      name: input.name,
      description: input.description,
      point: input.point,
      background: input.background,
      password: input.password.trim(),
      createdAt: `${createdAtStr}T00:00:00+09:00`,
    });
  };

  return (
    <div className={style.page}>
      <div className={style.card}>
        <h2 className={style.cardTitle}>
          {initData ? '스터디 수정하기' : '스터디 만들기'}
        </h2>

        <div className={style.form}>
          <InputContainer
            name="nickname"
            value={input.nickname}
            onChange={onChangeInput}
            label={'닉네임'}
            placeholder="닉네임을 입력해 주세요"
            error={errors.nickname}
          />
          <InputContainer
            name="name"
            value={input.name}
            onChange={onChangeInput}
            label={'스터디 이름'}
            placeholder="스터디 이름을 입력해주세요"
            error={errors.name}
          />
          <InputContainer
            name="description"
            value={input.description}
            onChange={onChangeInput}
            label={'소개'}
            placeholder="소개 멘트를 작성해 주세요"
            error={errors.description}
            multiline
          />

          <section className={style.backgroundSection}>
            <span className={style.backgroundTitle}>배경을 선택해주세요</span>
            <div className={style.backgroundList}>
              {backgroundList.map((item) => (
                <BackgroundItem
                  onClick={() =>
                    onChangeInput({
                      target: {
                        name: 'background',
                        value: item.background,
                      },
                    })
                  }
                  key={item.background}
                  {...item}
                  isSelected={item.background === input.background}
                />
              ))}
            </div>
          </section>

          <InputContainer
            name="password"
            type="password"
            value={input.password}
            onChange={onChangeInput}
            label={'비밀번호'}
            placeholder="비밀번호를 입력해 주세요"
            error={errors.password}
          />
          <InputContainer
            name="passwordCheck"
            type="password"
            value={input.passwordCheck}
            onChange={onChangeInput}
            label={'비밀번호 확인'}
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            error={errors.passwordCheck}
          />
        </div>

        <div className={style.submit}>
          <NormalButton
            isClick={onClickSubmitButton}
            children={initData ? '수정하기' : '만들기'}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
