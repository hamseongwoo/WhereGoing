import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "yg-jalnan";
    src: url("/fonts/Jalnan2.otf") format("opentype"),
     url("/fonts/Jalnan2TTF.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "yg-jalnan", sans-serif;
  }
`;

export default GlobalStyle;
