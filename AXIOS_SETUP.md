# Axios 설정 가이드

이 프로젝트에서 axios를 사용한 API 통신을 위한 설정 가이드입니다.

## 📁 파일 구조

```
src/
├── utils/
│   └── api.js          # axios 기본 설정 및 API 메서드
├── services/
│   └── transactionService.js  # 실제 API 연동 서비스 예시
.env                     # 환경변수 설정
.env.example            # 환경변수 예시 파일
```

## 🔧 기본 설정

### 1. 환경변수 설정

`.env` 파일에서 API URL을 설정합니다:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_MOCK=true
VITE_DEBUG=true
```

### 2. Axios 인스턴스

`src/utils/api.js`에서 axios 인스턴스가 설정되어 있습니다:

- **기본 URL**: 환경변수에서 설정
- **타임아웃**: 10초
- **자동 인증**: localStorage의 토큰 자동 추가
- **에러 처리**: 401 에러 시 자동 로그아웃
- **응답 처리**: response.data 자동 반환

## 🚀 사용법

### 1. 기본 API 호출

```javascript
import { authAPI, transactionsAPI } from '@/utils/api'

// 로그인
const response = await authAPI.login({ email, password })

// 거래 내역 조회
const transactions = await transactionsAPI.getAll()

// 거래 내역 생성
const newTransaction = await transactionsAPI.create({
  type: 'expense',
  amount: 50000,
  categoryId: 1,
  description: '점심식사'
})
```

### 2. 서비스 레이어 사용

```javascript
import transactionService from '@/services/transactionService'

// 필터링된 거래 내역 조회
const transactions = await transactionService.fetchTransactions({
  type: 'expense',
  dateRange: { start: '2024-01-01', end: '2024-01-31' }
})
```

### 3. Store에서 사용

```javascript
// stores/transactions.js
import transactionService from '@/services/transactionService'

export const useTransactionsStore = defineStore('transactions', {
  actions: {
    async fetchTransactions() {
      this.loading = true
      try {
        // Mock API 대신 실제 API 사용
        if (import.meta.env.VITE_ENABLE_MOCK === 'false') {
          this.transactions = await transactionService.fetchTransactions()
        } else {
          // 기존 Mock API 사용
          this.transactions = await this.mockFetchTransactions()
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

## 🔄 Mock에서 실제 API로 전환

### 1. 환경변수 변경

```env
# .env
VITE_ENABLE_MOCK=false  # Mock 비활성화
VITE_API_URL=https://your-api-server.com/api
```

### 2. Store 메서드 수정

```javascript
// 기존 Mock 코드
const transactions = await this.mockFetchTransactions()

// 실제 API 코드로 변경
const transactions = await transactionService.fetchTransactions()
```

## 🛡️ 보안 설정

### 1. 인증 토큰 자동 관리

- 로그인 시 토큰이 localStorage에 저장됨
- 모든 API 요청에 자동으로 Authorization 헤더 추가
- 401 에러 시 자동 로그아웃 및 로그인 페이지 리다이렉트

### 2. 에러 처리

```javascript
try {
  const data = await transactionsAPI.getAll()
} catch (error) {
  // error.message에 표준화된 에러 메시지
  console.error('API 호출 실패:', error.message)
}
```

## 📝 API 메서드 목록

### 인증 (authAPI)
- `login(credentials)` - 로그인
- `register(userData)` - 회원가입
- `logout()` - 로그아웃
- `forgotPassword(email)` - 비밀번호 찾기
- `updateProfile(userData)` - 프로필 수정

### 거래 내역 (transactionsAPI)
- `getAll(params)` - 거래 내역 조회
- `create(data)` - 거래 내역 생성
- `update(id, data)` - 거래 내역 수정
- `delete(id)` - 거래 내역 삭제
- `getCategories()` - 카테고리 조회

### 예산 (budgetAPI)
- `getAll(params)` - 예산 조회
- `create(data)` - 예산 생성
- `update(id, data)` - 예산 수정
- `delete(id)` - 예산 삭제

### 목표 (goalsAPI)
- `getAll()` - 목표 조회
- `create(data)` - 목표 생성
- `contribute(id, amount, description)` - 목표 기여
- `pause(id)` / `resume(id)` - 목표 일시정지/재개

## 🔧 커스터마이징

### 1. 인터셉터 추가

```javascript
// src/utils/api.js
api.interceptors.request.use(config => {
  // 요청 로깅
  if (import.meta.env.VITE_DEBUG === 'true') {
    console.log('API Request:', config)
  }
  return config
})
```

### 2. 에러 처리 커스터마이징

```javascript
api.interceptors.response.use(
  response => response.data,
  error => {
    // 커스텀 에러 처리
    if (error.response?.status === 403) {
      // 권한 없음 처리
    }
    return Promise.reject(error)
  }
)
```

이제 axios가 완전히 설정되었습니다! 🎉