import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Jalnan';
    src: url('/fonts/Jalnan2TTF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
  font-family: 'Pretendard-ExtraBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2111@1.0/Pretendard-ExtraBold.woff') format('woff');
  font-style: normal;
}


  body {
    font-family: 'Pretendard-ExtraBold', 'Jalnan', sans-serif;
  }
`;

export default GlobalStyle;
