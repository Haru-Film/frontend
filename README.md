# 하루 필름 : 영상 일기 스트리밍 서비스 Frontend

## 주요 기술

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

## How to Run

실행 전 `.env` 파일을 생성하고, `.env.example` 파일을 참고하여 환경 변수를 설정해주세요.

```bash
pnpm install
pnpm dev
```

## 프로젝트 구조

```text
src/
├── api/                # API 클라이언트 (ky 기반)
│   └── types/          # API 타입 정의
├── assets/             # 정적 리소스 (이미지, 폰트 등)
├── components/         # 재사용 가능한 공통 컴포넌트
├── config/             # 설정 파일 (환경변수, 상수 등)
├── hooks/              # 커스텀 훅
├── lib/                # 유틸리티 함수 및 헬퍼
├── routes/             # 라우팅 (TanStack Router)
│   ├── _auth/            # 인증 필요한 페이지들
│   └── _public/          # 인증되지 않은 사용자용 페이지들
├── stores/             # 전역 상태 관리 (Zustand)
├── types/              # TypeScript 타입 정의
├── index.css           # 글로벌 스타일 & Tailwind 설정
└── main.tsx            # 앱 진입점
```

## 라이브러리 사용

| 카테고리              | 라이브러리                     | 설명                                                                     |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **라우팅 & 상태관리** | TanStack Router                | 타입 안전성을 보장하는 파일 기반 라우팅                                  |
|                       | TanStack Query                 | 서버 상태 관리(Caching, Refetching 등) 및 비동기 처리                    |
|                       | Zustand                        | 간결한 전역 상태 관리                                                    |
| **HTTP & 검증**       | ky                             | Fetch API 기반 HTTP 클라이언트                                           |
|                       | Zod                            | 런타임 스키마 검증 및 TypeScript 타입 자동 추론 (환경변수, API 응답 등)  |
| **미디어 처리**       | fix-webm-duration              | MediaRecorder로 녹화한 WebM 파일에 누락된 duration(길이) 메타데이터 주입 |
| **유틸리티 & 에러**   | p-limit                        | 비동기 작업의 동시 실행 개수 제한 (병목 현상 방지)                       |
|                       | react-error-boundary           | 런타임 에러를 선언적으로 포착하고 Fallback를 표시                        |
| **UI & 스타일링**     | Tailwind CSS                   | 유틸리티 클래스 기반 CSS 프레임워크 (v4)                                 |
|                       | class-variance-authority (CVA) | UI 컴포넌트의 Variant(크기, 색상 등) 상태를 직관적으로 관리              |
|                       | Sonner                         | 토스트(Toast) 알림                                                       |
| **개발 도구**         | React Compiler                 | React 19의 자동 메모이제이션 컴파일러                                    |
|                       | @lukemorales/query-key-factory | React Query의 쿼리 키를 체계적이고 타입 안전하게 관리                    |
