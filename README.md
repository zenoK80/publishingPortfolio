# Zeno Portfolio

Web Designer & Publisher 포트폴리오 사이트입니다.
Vanilla JavaScript Web Components 구조로 페이지를 구성하고, 포트폴리오 작업물은 `data/portfolioItems.js` 배열에서 관리합니다.

- Live Site: [portfolio.zeno.it.kr](https://portfolio.zeno.it.kr/)
- Docs: [zeno.it.kr](https://zeno.it.kr/)

## Features

- Shadow DOM 없이 Light DOM 기반 Custom Elements 사용
- `SiteHeader`, `HeroSection`, `WorksSection`, `PortfolioCard`, `SiteFooter`, `BackToTop` 컴포넌트 분리
- 포트폴리오 카드를 `data/portfolioItems.js` 배열로 관리
- `PortfolioCard`를 재사용 가능한 카드 컴포넌트로 렌더링
- 개인작업 / 실무작업 기준 필터
- 사이트 / 토이 / UX/UI / 그래픽 등 작업 분류 필터
- 필터 결과를 9개씩 보여주는 페이지네이션
- `innerHTML` 없이 DOM API 기반 렌더링
- 필터 결과 변경을 `aria-live` 영역으로 보조기기에 전달
- GitHub Pages + Custom Domain 배포

## Tech Stack

| Area | Stack |
| --- | --- |
| Markup | HTML5, Custom Elements |
| Style | CSS3, CSS Variables, Grid, Flexbox |
| Script | Vanilla JavaScript, ES Modules |
| Icons | Material Symbols |
| Fonts | Pretendard |
| Hosting | GitHub Pages, Custom Domain |

## Project Structure

```txt
zeno-v2/
├── index.html
├── about.html
├── CNAME
├── components/
│   ├── index.js
│   ├── BackToTop/
│   ├── HeroSection/
│   ├── PortfolioCard/
│   ├── SiteFooter/
│   ├── SiteHeader/
│   └── WorksSection/
├── css/
│   ├── common.css
│   ├── main.css
│   └── about.css
├── data/
│   └── portfolioItems.js
├── js/
│   └── main.js
├── images/
└── portfolio/
```

## Component Pattern

컴포넌트 폴더와 클래스는 PascalCase, 커스텀 태그는 kebab-case를 사용합니다.

```txt
components/
└── PortfolioCard/
    ├── PortfolioCard.js
    └── PortfolioCard.css
```

```html
<portfolio-card
  category="site"
  scope="personal"
  tech="HTML,CSS,JavaScript"
  title="Project Title"
></portfolio-card>
```

각 컴포넌트는 자기 CSS를 직접 로드합니다.

```js
const COMPONENT_STYLE = new URL('./PortfolioCard.css', import.meta.url).href;
```

이 방식은 현재 JS 파일 위치를 기준으로 CSS 경로를 계산하기 때문에 정적 배포 환경에서도 상대 경로를 안정적으로 사용할 수 있습니다.

## Rendering Safety

사용자에게 보이는 카드 데이터는 HTML 문자열로 주입하지 않습니다.

- `PortfolioCard`는 `createElement`, `textContent`, `setAttribute`, `replaceChildren`를 사용합니다.
- `WorksSection`은 `portfolioItems` 데이터를 읽고 `<portfolio-card>` 요소를 DOM API로 생성합니다.
- `innerHTML`, `insertAdjacentHTML`, `setHTMLUnsafe`를 포트폴리오 데이터 렌더링에 사용하지 않습니다.
- `SiteHeader`, `SiteFooter`는 `header.html`, `footer.html` 조각 파일 없이 Custom Element로 렌더링합니다.

나중에 JSON, CMS, 관리자 입력값으로 작업물 데이터를 바꾸더라도 XSS 위험을 줄이기 위한 구조입니다.

## Works Data

작업물은 [data/portfolioItems.js](data/portfolioItems.js)의 `portfolioItems` 배열에서 관리합니다.
새 작업물을 추가할 때는 객체 하나를 추가하면 됩니다.

```js
{
  id: 'starbucks-clone',
  category: 'site',
  scope: 'personal',
  tech: 'HTML,CSS,jQuery',
  order: 0,
  href: 'portfolio/site/starbucks/index.html',
  image: 'images/portfolio-2.png',
  alt: '스타벅스 웹사이트',
  tag: '사이트',
  date: '2023',
  stack: 'HTML · CSS · jQuery',
  title: '스타벅스 웹 사이트',
  desc: '스타벅스 클론 프로젝트. 메인·메뉴·매장찾기까지 만들어봤습니다.'
}
```

## Main Script

[main.js](js/main.js)는 컴포넌트가 렌더링한 DOM에 화면 동작을 연결합니다.

- `Filter`: 개인작업 / 실무작업과 작업 분류 필터
- `Pagination`: 필터 결과를 9개씩 페이지로 분할
- `Menu`: 모바일 메뉴 열기 / 닫기
- `BackToTop`: 상단 이동 버튼

필터 결과 수는 화면 카운트와 `aria-live` 영역에 함께 반영됩니다.

## Custom Domain

GitHub Pages의 커스텀 도메인은 `CNAME` 파일에서 관리합니다.

```txt
portfolio.zeno.it.kr
```

GitHub Pages 설정에서 `DNS Check in Progress`가 보이면 DNS 확인과 HTTPS 인증서 발급이 아직 진행 중인 상태입니다. DNS가 정상 확인되면 `Enforce HTTPS`를 켤 수 있고, 보통 몇 분에서 길게는 24시간 정도 걸릴 수 있습니다.

## Naming

- Component class: PascalCase (`PortfolioCard`)
- Component folder/file: PascalCase (`PortfolioCard/PortfolioCard.js`)
- Custom element tag: kebab-case (`portfolio-card`)
- CSS class: kebab-case (`card-media`)
- Data object key: camelCase where needed
- Stable data id: kebab-case (`starbucks-clone`)

## Contact

- Email: [zenok1992@gmail.com](mailto:zenok1992@gmail.com)

## License

© 2026 Zeno. All rights reserved.
