# Ryokoplan 배포 가이드

## 파일 구조
```
ryokoplan/
├── index.html      ← 메인 서비스 파일
├── vercel.json     ← Vercel 배포 설정
└── README.md       ← 이 파일
```

---

## 1단계: GitHub에 올리기

1. github.com 접속 → 로그인
2. 우측 상단 `+` → `New repository`
3. Repository name: `ryokoplan`
4. Public 선택 → `Create repository`
5. 아래 명령어 실행 (터미널 또는 GitHub Desktop):

```bash
git init
git add .
git commit -m "첫 번째 배포"
git branch -M main
git remote add origin https://github.com/본인아이디/ryokoplan.git
git push -u origin main
```

---

## 2단계: Vercel 배포

1. vercel.com 접속 → 로그인
2. `New Project` 클릭
3. GitHub 연결 → `ryokoplan` 저장소 선택
4. `Deploy` 클릭 → 자동 배포!

---

## 3단계: 환경변수 설정 (API 키)

Vercel 대시보드 → 프로젝트 선택 → Settings → Environment Variables

| 변수명 | 값 |
|--------|-----|
| `ANTHROPIC_API_KEY` | sk-ant-api03-... (본인 키) |
| `KAKAO_JS_KEY` | 카카오 개발자 콘솔에서 발급 |

---

## 4단계: 도메인 연결 (ryokoplan.com)

1. Vercel → 프로젝트 → Settings → Domains
2. `ryokoplan.com` 입력 → Add
3. 가비아 → 도메인 관리 → DNS 설정
4. Vercel이 알려주는 CNAME 값 입력
5. 10~30분 후 자동 연결!

---

## 5단계: 카카오 로그인 설정

1. developers.kakao.com 접속 → 로그인
2. `내 애플리케이션` → `애플리케이션 추가하기`
3. 앱 이름: `Ryokoplan` → 저장
4. 앱 키 → `JavaScript 키` 복사
5. index.html 하단 카카오 SDK 주석 해제 후 키 입력
6. `플랫폼` → `Web` → `https://ryokoplan.com` 등록

---

## 6단계: index.html에서 API 키 교체

```javascript
// 이 줄을 찾아서
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';

// Vercel 환경변수 사용으로 변경 (api/generate.js 파일 별도 생성 권장)
```

> ⚠️ API 키는 절대 코드에 직접 넣지 마세요!
> Vercel 환경변수로만 관리하세요.

---

## 제휴 링크 연결 (수익화)

`index.html`에서 아래 링크를 본인 제휴 ID로 교체:

- Booking.com: `https://www.booking.com?aid=YOUR_ID`
- Klook: `https://www.klook.com?aff=YOUR_ID`
- Agoda: `https://www.agoda.com?cid=YOUR_ID`

---

## 문의
contact@ryokoplan.com
