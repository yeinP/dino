import React from 'react';
import styled from 'styled-components';
import { flexCol, fluid } from './CommonCss';

function WhiteBackground({ children }) {
  return <WhiteBackgroundDiv>{children}</WhiteBackgroundDiv>;
}

const WhiteBackgroundDiv = styled.div`
  ${fluid}
  min-height: calc(100vh - 296px);
  background-color: #f9f9f9;
  ${flexCol('center')}
  @media ${({ theme }) => theme.device.tablet} {
    min-height: calc(100vh - 200px);
  }
  @media ${({ theme }) => theme.device.mobile} {
    min-height: unset;
  }
`;

export default WhiteBackground;