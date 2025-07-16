# 코드 품질 도구 설정

### ESLint

- **목적**: JavaScript/Vue 코드의 문법 오류 및 코드 스타일 검사
- **설정 파일**: `eslint.config.js`
- **주요 규칙**:
  - Vue 3 Composition API 지원
  - 사용하지 않는 변수 검출
  - console.log 경고
  - 코드 스타일 일관성 검사

### Prettier

- **목적**: 코드 포맷팅 자동화
- **설정 파일**: `.prettierrc`
- **주요 설정**:
  - 세미콜론 없음
  - 싱글 쿼트 사용
  - 탭 크기: 2
  - 줄 길이: 80자

### Husky

- **목적**: Git hooks 관리
- **설정**: `.husky/pre-commit`
- **동작**: 커밋 전 자동으로 포맷팅 및 린트 검사 실행

## 📝 사용 가능한 스크립트

```bash
# 코드 린트 검사 및 자동 수정
npm run lint

# 코드 린트 검사만 (수정하지 않음)
npm run lint:check

# 코드 포맷팅 적용
npm run format

# 코드 포맷팅 검사만 (수정하지 않음)
npm run format:check
```

## 🚀 개발 워크플로우

1. **코드 작성**
2. **저장 시 자동 포맷팅** (VS Code 설정 적용)
3. **커밋 전 자동 검사** (Husky pre-commit hook)
4. **필요시 수동 린트/포맷 실행**

## ⚙️ VS Code 설정

`.vscode/settings.json` 파일에 다음 설정이 포함되어 있습니다:

- 저장 시 자동 포맷팅
- ESLint 자동 수정
- Vue 파일 지원
- Prettier를 기본 포맷터로 설정

## 🔍 현재 코드 상태

프로젝트에는 다음과 같은 ESLint 이슈들이 있습니다:

- **경고 (38개)**: 주로 `console.log` 사용
- **오류 (8개)**: 사용하지 않는 변수들

이러한 이슈들은 개발 중에는 허용되지만, 프로덕션 배포 전에 해결하는 것을 권장합니다.

## 📋 권장사항

### 개발 중

- VS Code에서 ESLint와 Prettier 확장 프로그램 설치
- 저장 시 자동 포맷팅 활용
- 정기적으로 `npm run lint` 실행

### 프로덕션 배포 전

- 모든 ESLint 오류 해결
- console.log 제거 또는 적절한 로깅 시스템으로 교체
- `npm run lint:check` 통과 확인

## 🛠️ 설정 커스터마이징

필요에 따라 다음 파일들을 수정할 수 있습니다:

- `eslint.config.js`: ESLint 규칙 조정
- `.prettierrc`: Prettier 포맷팅 옵션 변경
- `.husky/pre-commit`: Git hook 동작 수정