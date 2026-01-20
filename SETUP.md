# 사이트 설정 가이드

## 연락처 정보 변경

`src/config/contact.ts` 파일을 열어 다음 정보를 실제 정보로 변경해주세요:

```typescript
export const contactInfo = {
  phone: "010-0000-0000",        // 어머니 휴대폰 번호
  email: "contact@example.com",  // 실제 이메일 주소
  address: "실제 주소",          // 공장 주소
  businessHours: "평일 09:00 ~ 18:00",  // 영업 시간
  companyName: "보온핀 전문 제조 공장",  // 회사명
};
```

이 파일을 변경하면 사이트 전체의 연락처 정보가 자동으로 업데이트됩니다.

## 회사 정보 수정

### 회사 소개 페이지

`src/views/AboutView.vue` 파일에서 다음 내용을 수정할 수 있습니다:

- **인사말**: `greeting` 섹션
- **연혁**: `history` 섹션의 `timeline-item` 항목들
- **경영 이념**: `values` 섹션

### 제품 정보 수정

`src/views/ProductsView.vue` 파일에서 다음을 수정할 수 있습니다:

- **제품 설명**: `product-info` 섹션
- **제품 규격**: `spec-table` 테이블
- **제품 특징**: `features` 섹션
- **적용 분야**: `application` 섹션

## 이미지 추가

현재는 이모지로 대체되어 있습니다. 실제 제품 사진을 추가하려면:

1. `public` 폴더에 이미지 파일 추가
2. 각 컴포넌트에서 이미지 경로 참조

예시:
```vue
<img src="/images/product1.jpg" alt="보온핀 제품" />
```

## 지도 연동

`src/views/LocationView.vue` 파일에서 지도를 연동할 수 있습니다:

### 네이버 지도 API
1. 네이버 클라우드 플랫폼에서 API 키 발급
2. `LocationView.vue`에 지도 컴포넌트 추가

### 구글 지도 API
1. Google Cloud Console에서 API 키 발급
2. `LocationView.vue`에 지도 컴포넌트 추가

## SEO 설정

### 메타 태그 수정

각 페이지의 메타 태그는 `src/router/index.ts`에서 설정됩니다:

```typescript
{
  path: "/",
  name: "home",
  component: HomeView,
  meta: {
    title: "보온핀 전문 제조 공장 | 단열재 고정핀",
    description: "품질과 신용으로 승부하는 보온핀 전문 제조 공장...",
  },
}
```

### 사이트 기본 정보

`index.html` 파일에서 기본 메타 태그를 수정할 수 있습니다.

## 배포 전 체크리스트

- [ ] `src/config/contact.ts`의 연락처 정보 확인
- [ ] 회사 소개 내용 확인
- [ ] 제품 정보 및 규격 확인
- [ ] 주소 정보 확인
- [ ] 이메일 주소 확인
- [ ] 전화번호 확인
- [ ] SEO 메타 태그 확인
- [ ] 모든 링크가 정상 작동하는지 확인

## 추가 기능 구현 (선택사항)

### 이메일 전송 기능

현재는 `mailto:` 링크를 사용하고 있습니다. 실제 이메일 전송 기능을 구현하려면:

1. 백엔드 API 서버 구축
2. 이메일 서비스 연동 (SendGrid, AWS SES 등)
3. `src/views/InquiryView.vue`의 `handleSubmit` 함수 수정

### 지도 API 연동

네이버 지도나 구글 지도를 연동하려면 해당 API 키를 발급받아 사용하세요.

### 분석 도구 추가

Google Analytics나 Naver Analytics를 추가하려면:

1. `index.html`에 스크립트 추가
2. 또는 `src/main.ts`에서 동적으로 로드