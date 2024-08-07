import {css} from "styled-components";

export const flexCol = (align, justify, wrap) => css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap ? 'wrap' : 'unset'};
`;