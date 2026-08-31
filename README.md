# **{4팀}**

(팀 협업 문서 링크 게시)

## **팀원 구성**

권다운 (개인 Github 링크)

김숙연 (개인 Github 링크)

이승현 (개인 Github 링크)

이지우 (개인 Github 링크)

정호영 (개인 Github 링크)

---

## **프로젝트 소개**

- 개인 공부 관리 및 커뮤니티 서비스 “공부의 숲”
- 프로젝트 기간: 2026.09.01 ~ 2026.09.17

---

## **기술 스택**

- Frontend: JavaScript, React.js ...
- Backend: Express.js, PrismaORM ...
- Database: ?
- 공통 Tool: Git & Github, Discord, zep, ...

---

## **팀원별 구현 기능 상세**

### 권다운(팀장)

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **소셜 로그인 기능**
    - 구글 소셜 로그인 API 사용으로 소셜 로그인 기능 구현
    - 사이트 이용을 위한 추가 정보 입력 기능 구현
- **소셜 로그인 후 회원 추가 정보 입력 기능**
    - user 타입(관리자, 학생)에 대한 조건부 추가 입력 모달창 기능 및 페이지 이동 기능 구현

### 김숙연

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **Nav**
    - 회원별 버튼 조건부 렌더링(학생: 커리어, 스킬, 수강후기, 커뮤니티, 관리자: 회원 관리 관리자 페이지)
    - 반응형 레이아웃 구현
- **메인페이지**
    - fetch(POST, GET)을 사용하여 무료 수강 종료 시간 기능 구현
- **공용 Modal 컴포넌트**
    - 공용으로 사용할 Modal 컴포넌트 구현

### 이승현

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **마이 페이지**
    - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
    - 반응형 레이아웃 구현
- **공용 Button 컴포넌트**
    - 공용으로 사용할 Button 컴포넌트 구현

### 이지우

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
    - path parameter를 사용하여 학생 페이지와 동적 라우팅 기능 구현
    - 학생별 정보 목록 carousel 슬라이더 구현
    - fetch(PATCH, DELETE)를 사용하여 개인정보 수정 및 탈퇴 기능 구현
    - fetch(POST, PATCH, DELETE)를 사용하여 학생 정보 CRUD 기능 구현
- **공용 Button 컴포넌트**
    - 공용으로 사용할 Button 컴포넌트 구현

### 정호영

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
    - fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
    - 반응형 레이아웃 구현
- **마이 페이지**
    - fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
- **공용 Modal 컴포넌트**
    - 공용으로 사용할 Modal 컴포넌트 구현

---

## **파일 구조**

```

src
 ┣ client
 ┃ ┣ __mocks__
 ┃ ┃ ┣ courses.json
 ┃ ┃ ┗ index.ts
 ┃ ┣ features
 ┃ ┃ ┣ Layout
 ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┗ codeit-logo-purple.svg
 ┃ ┃ ┃ ┣ Layout.module.scss
 ┃ ┃ ┃ ┣ Layout.stories.tsx
 ┃ ┃ ┃ ┣ Layout.tsx
 ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ LessonSearch
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ CourseResult
 ┃ ┃ ┃ ┃ ┃ ┣ CourseResult.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ CourseResult.tsx
 ┃ ┃ ┃ ┗ EmptyResult
 ┃ ┃ ┃ ┃ ┣ EmptyResult.module.scss
 ┃ ┃ ┃ ┃ ┣ EmptyResult.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┣ LessonSearch.module.scss
 ┃ ┃ ┣ LessonSearch.stories.tsx
 ┃ ┃ ┣ LessonSearch.tsx
 ┃ ┃ ┗ index.ts
 ┃ ┣ models
 ┃ ┃ ┣ course.d.ts
 ┃ ┃ ┗ react.d.ts
 ┃ ┣ shared
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┗ course.ts
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ Button
 ┃ ┃ ┃ ┃ ┣ Button.module.scss
 ┃ ┃ ┃ ┃ ┣ Button.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ CourseInfo
 ┃ ┃ ┃ ┃ ┣ CourseInfo.module.scss
 ┃ ┃ ┃ ┃ ┣ CourseInfo.stories.tsx
 ┃ ┃ ┃ ┃ ┗ CourseInfo.tsx
 ┃ ┃ ┃ ┣ Input
 ┃ ┃ ┃ ┃ ┣ Input.module.scss
 ┃ ┃ ┃ ┃ ┣ Input.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Input.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┗ Select
 ┃ ┃ ┃ ┃ ┣ images
 ┃ ┃ ┃ ┃ ┃ ┗ triangle-dark.svg
 ┃ ┃ ┃ ┃ ┣ Select.module.scss
 ┃ ┃ ┃ ┃ ┣ Select.stories.tsx
 ┃ ┃ ┃ ┃ ┣ Select.tsx
 ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┗ helpers
 ┃ ┃ ┃ ┣ api
 ┃ ┃ ┃ ┃ ┣ __tests__
 ┃ ┃ ┃ ┃ ┃ ┣ base.test.ts
 ┃ ┃ ┃ ┃ ┃ ┣ helpers.test.ts
 ┃ ┃ ┃ ┃ ┃ ┗ wrapper.test.ts
 ┃ ┃ ┃ ┃ ┣ wrapper
 ┃ ┃ ┃ ┃ ┃ ┣ fetch.ts
 ┃ ┃ ┃ ┃ ┃ ┗ index.ts
 ┃ ┃ ┃ ┣ base.ts
 ┃ ┃ ┃ ┣ error.ts
 ┃ ┃ ┃ ┣ helpers.ts
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┗ type.ts
 ┃ ┃ ┗ react-query.ts
 ┣ server
 ┃ ┣ controllers
 ┃ ┃ ┣ authController.ts
 ┃ ┃ ┗ userController.ts
 ┃ ┣ models
 ┃ ┃ ┣ userModel.ts
 ┃ ┃ ┗ courseModel.ts
 ┃ ┣ routes
 ┃ ┃ ┣ authRoutes.ts
 ┃ ┃ ┗ userRoutes.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ authMiddleware.ts
 ┃ ┃ ┗ errorHandler.ts
 ┃ ┣ app.ts
 ┃ ┗ server.ts
 ┣ App.tsx
 ┣ _mixin.scss
 ┣ common.scss
 ┣ index.tsx
 ┣ react-app-env.d.ts
 ┣ reportWebVitals.js
 ┗ setupTests.js
```

---

## **구현 홈페이지**

(개발한 홈페이지에 대한 링크 게시)

https://www.codeit.kr/

---

## **프로젝트 회고록**

(제작한 발표자료 링크 혹은 첨부파일 첨부)