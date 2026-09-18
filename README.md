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
- Database: PostgreSQL, DBeaver
- 배포, 협업: Git & Github, Discord, zep, Notion, Swagger, Render, Netlify

---

## **팀원별 구현 기능 상세**

### 권다운(팀장)

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

#### 홈
<img width="1561" height="1053" alt="image" src="https://github.com/user-attachments/assets/88b2d3c1-2a23-44e8-b5db-8d190f541d62" />


##### 최근 조회한 스터디
- localStorage에 id만 저장하고 홈에 올 때마다 id로 데이터를 다시 조회하는 방식
  - 화면에 표시하는 건 3개지만 삭제됐을 때 대체할 여유분까지 사실은 총 6개를 저장.

##### 스터디 조회(렌더)

- 검색 기능
- 정렬 기능
- API 연결해서 화면에 데이터 렌더

#### 스터디 만들기

<img width="896" height="1096" alt="image" src="https://github.com/user-attachments/assets/1bad2ad6-f0dc-482d-8509-1213b858e641" />

- 배경 이미지는 클라이언트에서 관리하는 모듈을 만듬
- 두 페이지에서 사용되는 Editor 컴포넌트를 생성/수정 폼을 통합 구현
- 제출 전 필수 값 유효성 검증
- 비밀번호 체크

#### 스터디 수정

- 스터디 만들기랑 같은 폼에서 id로 해당 스터디 정보를 불러와서 필요한 부분 수정
- 존재하지 않는 스터디면 알림을 띄우고 홈으로 보냄.

### 김숙연

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

#### 스터디 상세페이지

- 스터디 및 포인트 조회
- url 복사
- 비밀번호 모달
- 이모지
    - 태그
    - 추가버튼
    - 숨김버튼 및 숨김처리
    - 이모지 추가기능(라이브러리)
    - 이모지 카운트(추가 생성)
    - 토글기능
- 비밀번호 모달창
    - 토스트 메시지
- 주관 습관기록표
    - 습관명, 습관기록 API연결 조회 가공
        - 한국시간변경
        - 습관삭제 시 이전 기록 남김처리(곰발바닥)
        - 주단위 초기화 (시연방법 고민)

※ 습관기록표에서 이전 체크기록이 있는 습관 삭제 시 마지막 체크기록 생성일 이후 빈칸처리 되는 이유.

### 이승현

#### 오늘의 습관 페이지

<img width="721" height="581" alt="image" src="https://github.com/user-attachments/assets/877cc847-e278-4782-a76c-7005a4bcea2e" />
- 존재하지 않는 스터디 ID로 진입했을 때 화면

<img width="1074" height="749" alt="image" src="https://github.com/user-attachments/assets/ec35e53f-5bcb-496c-afb3-960f3227f651" />
- 존재하는 스터디로 진입했을 때의 화면
 
<img width="1060" height="237" alt="image" src="https://github.com/user-attachments/assets/1d10597e-8f9c-49ec-813e-297bc8d997d7" />
- 습관 토글시 콘솔에 찍히도록 하였습니다.
  
- 각 습관을 토글하면 습관 기록이 생성/삭제됨. (매 토글시마다 API 요청)
    - 습관 기록은 습관당 하루 하나씩만 생성할 수 있고, 자정이 지나면 어제의 기존 습관 기록은 생성이나 삭제가 불가능함
    - 습관 목록을 빠르게 두 번 토글하여도 경쟁 상태(race condition)가 발생하지 않고 한 번만 또는 순차적으로 처리됨 (콘솔을 통해 확인 가능함)
- 습관은 최대 18개까지 만들 수 있고 6개 이상부터는 스크롤 화면으로 전환됨
- 오늘의 집중 버튼과 홈 버튼을 눌러 이동 가능

#### 수정 화면(모달)
<img width="1069" height="735" alt="image" src="https://github.com/user-attachments/assets/29b3638d-8081-4ec0-88c4-19ad437bb84e" />
- 습관 목록을 수정할 수 있는 모달창입니다.

<img width="1070" height="728" alt="image" src="https://github.com/user-attachments/assets/b405e48d-3d30-4b41-be43-3d5f5f5caa07" />
- 프론트엔드의 검증 로직이 오류 메시지를 띄울 수 있습니다.

<img width="1067" height="734" alt="image" src="https://github.com/user-attachments/assets/dcdb31dd-f770-41d2-8b37-1ae53df0c584" />
- 프론트엔드의 검증 로직이 안내 메시지를 띄우고 버튼을 비활성화할 수 있습니다.

- 목록 수정 버튼을 눌러 진입 가능함
- 모달창이 열리면 해당 스터디 현재 습관의 임시 사본이 만들어지고, 해당 사본의 목록을 생성/수정/삭제함
- 생성: (+) 버튼을 눌러 인풋이 열리면 입력 후 엔터

를 쳐서 저장하거나 ESC키로 빠져나올 수 있음

- 수정: 이미 만들어진 습관을 클릭하면 수정 인풋이 열리고 커서가 텍스트 입력 상태가 되면 입력 후 엔터를 쳐서 저장하거나 ESC키로 빠져나올 수 있음
- 삭제: 휴지통 버튼을 누르면 삭제됨
- 수정 완료: 임시 사본 편집이 완료되면 수정 완료를 눌러 API 호출을 보내고 수정된 습관 목록을 불러오며 끝
- 제한 기능
    - 습관 이름을 수정하거나 습관을 생성하는 중에는 다른 습관을 수정하거나 새로운 습관을 생성할 수 없습니다 → 저장 또는 빠져나오기 후 원하는 습관을 수정하거나 새로운 습관을 작성할 수 있습니다. (단, 습관 삭제는 가능합니다.)
    - 프론트엔드의 검증 로직이 오류 메세지를 띄울 수 있습니다.
        - 이미 존재하는 습관명으로 저장하려고 하면: “이미 있는 습관명입니다.”
        - 습관명을 20자 이상으로 저장하려고 하면: “습관명은 최대 20자로 입력해주세요.”
        - 습관이 18개가 되면: “습관이 가득 찼습니다!” (추가 버튼도 비활성화됩니다.)
    - 수정 완료를 누르면 API 요청이 완료되기까지 모달창의 색이 흐려지며 버튼이 비활성화되기 때문에, 빠르게 두 번 눌러도 경쟁 상태가 발생하지 않고 한 번만 처리됩니다. (콘솔을 통해 확인 가능)








### 이지우

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

## 공통 컴포넌트

- 입력 부분
- 모달창
- 이동 버튼
- 초록색 일반 버튼
- 태그 (이모지 관련)
- 경고문구
- 헤더

## 오늘의 집중 페이지

오늘의 집중 페이지 전체 담당

### DB 아닌 session storage

집중 페이지의 시간에 대해 굳이 DB가 저장하고 있을 필요성이 없다 판단

→ 사용자가 설정한 시간만 session Storage에 저장하는 형태로 제작

### 제한

- 집중 성공 최소 시간 : 10분
    
    사용자가 집중 시간을 1초로 설정하고 연타할 경우, 무한정 집중성공 포인트 3점을 획득하는 문제점 발견
    
    최소 집중 성공 시간을 10분으로 설정함에 따라 이에 대한 현상 방지
    
- 소요시간 제한 : 60분
    
    사용자가 stop 버튼을 누르지 않는한 무한정 시간을 받아버리는 문제점 발견
    
    사용자가 -로 뜨는 집중시간이 최대 60분까지 사용가능하게 제한을 둠. 
    

## study api 관련 CRUD 제작

## 더보기 관련 페이지네이션 훅 제작

- page가 올라감에 따라 기존 값에서 새롭게 불러온 값을 붙이는 형식으로 구성.

## 인증 관련 훅 제작 - useStudyAccess.js / checkAccess.js

### checkAccess

- get으로 인증 여부 불러와 인증이 필요한 경우 / 인증이 이미 된 경우를 확인

### verifyPassword

- post를 통해 password 입력한 값 받아서 서로 비교한 다음에 비밀번호 확인했다 하면 session Id 발급되는 것이고, 만약에 비밀번호 틀렸다 하면 오류 띄움.

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

실제 웹 배포 : https://15-boradori-study-forest.netlify.app/

---

## **프로젝트 회고록**

(제작한 발표자료 링크 혹은 첨부파일 첨부)
