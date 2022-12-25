import styled from "styled-components";

type ButtonWrapperProps = {
    correct: boolean;
    clickedAnswer: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 3s ease;

    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 1.2rem;
        font-weight: semibold;
        width: 100%;
        height: 2.5em;
        margin: 8px 0;
        background: ${({ correct, clickedAnswer }) =>
            correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)' 
                    : !correct && clickedAnswer ? 'linear-gradient(90deg, #ff5656, #c16868)'
                    : 'linear-gradient(90deg, #56ccff, #6eafb4)'
        };

        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        color: #ffffff;
        border-radius: 10px;

    }
`