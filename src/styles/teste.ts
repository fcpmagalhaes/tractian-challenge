import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import typography from './typography';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 100ms linear;
  }

  *, button, input {
    border: 0;
    background: none;
    transition: all 100ms linear;
  }

  html, body, #__next {
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;
  }

  body {
    color: ${colors.text};
    font-family: ${typography.fonts.biryani};
    font-size: ${typography.sizes.m};
    font-weight: normal;
  }
`;
