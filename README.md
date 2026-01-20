# 보온핀 전문 제조 공장 홈페이지

Vue 3 + TypeScript + Vite로 제작된 보온핀 전문 제조 공장 홈페이지입니다.

## 주요 기능

- ✅ 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- ✅ SEO 최적화 (메타 태그, 구조화된 데이터)
- ✅ 깔끔하고 정돈된 디자인
- ✅ 프리텐다드 폰트 적용
- ✅ 전화 및 이메일 문의 기능
- ✅ 온라인 견적 문의 양식

## 페이지 구성

- **메인페이지** (`/`) - 회사 소개 및 주요 제품 소개
- **회사 소개** (`/about`) - 인사말, 연혁, 경영 이념
- **제품 소개** (`/products`) - 보온핀 제품 정보 및 규격
- **오시는 길** (`/location`) - 공장 위치 및 연락처
- **견적 문의** (`/inquiry`) - 전화/이메일 문의 및 온라인 문의 양식

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 연락처 정보 설정

`src/config/contact.ts` 파일을 열어 실제 정보로 변경해주세요:

```typescript
export const contactInfo = {
  phone: "010-0000-0000", // 어머니 휴대폰 번호로 변경
  email: "contact@example.com", // 실제 이메일 주소로 변경
  address: "경기도 고양시 일산동구 지영로194번길 133-32 (지영동)", // 실제 주소로 변경
  businessHours: "평일 09:00 ~ 18:00",
  companyName: "보온핀 전문 제조 공장",
};
```

### 3. 이미지 추가 (선택사항)

`public/images/` 폴더에 다음 이미지를 추가하세요:

- **배너 이미지**: `banner.jpg` (권장 크기: 1920x500px 이상)
  - 메인 페이지 상단 배너에 표시됩니다
  - `src/views/HomeView.vue`에서 주석을 해제하고 이미지 경로를 설정하세요

- **제품 이미지**: `product1.jpg`, `product2.jpg` (권장 크기: 600x400px 이상)
  - 메인 페이지 제품 소개 섹션에 표시됩니다
  - `src/views/HomeView.vue`에서 주석을 해제하고 이미지 경로를 설정하세요

이미지가 없어도 사이트는 정상적으로 작동하며, 배경색으로 대체됩니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 빌드 및 배포

### 환경 변수 설정

배포 전에 다음 환경 변수를 설정해야 합니다:

**Vercel Dashboard → 프로젝트 → Settings → Environment Variables**

```
Key: VITE_API_BASE_URL
Value: https://api.seyoung-tech.kr
```

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 미리보기

```bash
npm run preview
```

## SEO 최적화

- 각 페이지별 메타 태그 설정
- Open Graph 태그 (소셜 미디어 공유 최적화)
- 시맨틱 HTML 구조
- 반응형 디자인

## 커스터마이징

### 색상 변경

주요 색상은 다음 파일들에서 관리됩니다:
- `src/App.vue` - 전역 스타일
- 각 페이지 컴포넌트의 `<style>` 섹션

### 내용 수정

- 회사 소개: `src/views/AboutView.vue`
- 제품 정보: `src/views/ProductsView.vue`
- 기타 페이지: `src/views/` 폴더 내 해당 파일

## 기술 스택

- **Vue 3** - 프론트엔드 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Vue Router** - 라우팅
- **Pinia** - 상태 관리
- **Pretendard** - 웹 폰트

## 라이선스

이 프로젝트는 개인 사용 목적으로 제작되었습니다.
