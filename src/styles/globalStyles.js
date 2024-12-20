import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: blue;
    }

    p {
        font-size: 20px;
    }
`;

export default MyGlobalStyles;
