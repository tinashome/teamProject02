import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    /* other styles */
    * {
      margin: 0;
      padding: 0;
    }

    *, :after, :before {
        box-sizing: border-box;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover,
      &:focus {
        cursor: pointer;
      }
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }

    ul,
    ol {
      list-style: none;
    }
`;
