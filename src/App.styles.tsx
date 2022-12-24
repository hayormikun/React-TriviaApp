import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #ffffff
    }

    .score {
        color: #ffffff;
        font-size: 2rem;
        margin: 0; 
    }

    h1 { 
        font-family: Fascinate Inline, Haettenschweiler, 'Arial Narrow Bold', san-serif;
        background-image: linear-gradient(180deg, #ffffff, #87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        -o-background-clip: text;
        -o-text-fill-color: transparent;

        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        text-align: center;
        margin: 20px;
        font-weight: 400;
    }

    .start, .next {
        cursor: pointer;
        backround: linear-gradient(180deg, #fff, #ffcc91)
        border 2px solid #d38558;
        box-shadow: 0px 5px 1
    }
`