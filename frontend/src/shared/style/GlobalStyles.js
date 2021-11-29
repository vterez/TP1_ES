import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --main-color-100: #485256;
    --main-color-200: #353c3f;
    --color-red: #6F0202;
    --color-green: #004E11;
    --color-white: #fff;
    --color-bg-red: #d99898;
  }
  
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    font-family: inherit;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    font-family: 'Lato', 'Roboto', sans-serif;
    box-sizing: border-box;
  }

  a {
    color: var(--color-black);
    text-decoration: none;
  }

`;

export default GlobalStyles;
