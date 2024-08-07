import styled, { css, keyframes } from 'styled-components';

export const size = css`
  ${({ flex }) => (flex ? `flex:  ${flex};` : '')}
  text-align: ${({ textAlign }) => textAlign || 'unset'};
  gap: ${({ gap }) => (gap ? `${gap}px` : 'unset')};
  width: ${({ width }) => width || 'unset'};
  min-width: ${({ minWidth }) => minWidth || 'unset'};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : 'unset')};
  height: ${({ height }) => height || 'unset'};
  min-height: ${({ minHeight }) => minHeight || 'unset'};
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : 'unset')};
  justify-content: ${({ justify }) => justify || 'unset'};
  align-items: ${({ align }) => align || 'unset'};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 'unset')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 'unset')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 'unset')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : 'unset')};
  padding-bottom: ${({ pb }) => (pb ? `${pb}px` : 'unset')};
  padding-top: ${({ pt }) => (pt ? `${pt}px` : 'unset')};
  padding-right: ${({ pr }) => (pr ? `${pr}px` : 'unset')};
  padding-left: ${({ pl }) => (pl ? `${pl}px` : 'unset')};

  @media ${({ theme }) => theme.device.tablet} {
    ${({ mFlex, flex }) =>
      mFlex ? `flex:  ${mFlex};` : flex ? `flex:${flex};` : ''}
    display: ${({ mDisplay }) => mDisplay || 'flex'};
    gap: ${({ gap, mGap }) =>
      mGap ? `${mGap}px` : gap ? `${gap}px` : 'unset'};
    min-width: ${({ minWidth, mMinWidth }) => mMinWidth || minWidth || 'unset'};
    min-height: ${({ minHeight, mMinHeight }) =>
      mMinHeight || minHeight || 'unset'};
    width: ${({ width, mWidth }) => mWidth || width || 'unset'};
    max-width: ${({ maxWidth, mMaxWidth }) => mMaxWidth || maxWidth || 'unset'};
    height: ${({ height, mHeight }) => mHeight || height || 'unset'};
    justify-content: ${({ justify, mJustify }) => mJustify || justify || ''};
    align-items: ${({ align, mAlign }) => mAlign || align || ''};
    margin-bottom: ${({ mb, mMb }) =>
      mMb ? `${mMb}px` : mb ? `${mb}px` : 'unset'};
    margin-top: ${({ mt, mMt }) =>
      mMt ? `${mMt}px` : mt ? `${mt}px` : 'unset'};
    margin-right: ${({ mr, mMr }) =>
      mMr ? `${mMr}px` : mr ? `${mr}px` : 'unset'};
    margin-left: ${({ ml, mMl }) =>
      mMl ? `${mMl}px` : ml ? `${ml}px` : 'unset'};
    padding-bottom: ${({ pb, mPb }) =>
      mPb ? `${mPb}px` : pb ? `${pb}px` : 'unset'};
    padding-top: ${({ pt, mPt }) =>
      mPt ? `${mPt}px` : pt ? `${pt}px` : 'unset'};
    padding-right: ${({ pr, mPr }) =>
      mPr ? `${mPr}px` : pr ? `${pr}px` : 'unset'};
    padding-left: ${({ pl, mPl }) =>
      mPl ? `${mPl}px` : pl ? `${pl}px` : 'unset'};
  }
`;

export const flexCol = (align, justify) => css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: ${justify};
  align-items: ${align};
`;

export const flexRow = (align, justify) => css`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: ${justify};
  align-items: ${align};
`;

export const shadow = (x, y, r, opacity) => css`
  box-shadow: ${x}px ${y}px ${r}px rgba(30, 30, 32, ${opacity});
`;

export const scrollbar = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 19px;
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const fluid = css`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  box-sizing: border-box;
`;

export const backgroundCenter = css`
  background-position: center;
  background-repeat: no-repeat;
`;

export const fadein = keyframes`
0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Line = styled.div`
  width: ${({ width }) => width || '1px'};
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: ${({ mb }) => mb && `${mb}px`};
  margin-top: ${({ mt }) => mt && `${mt}px`};
`;

export const RowDiv = styled.div`
  display: ${({ display }) => display || 'flex'};
  flex-direction: row;
  flex-wrap: ${({ $wrap }) => $wrap && 'wrap'};
  box-sizing: border-box;
  ${size}

  @media ${({ theme }) => theme.device.minDesktop} {
    flex-direction: ${({ tDirection }) => (tDirection ? 'column' : 'row')};
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: ${({ tDirection, mDirection }) =>
      mDirection ? 'column' : tDirection ? 'column' : 'row'};
  }
`;

export const ColDiv = styled.div`
  display: ${({ display }) => display || 'flex'};
  flex-direction: column;
  box-sizing: border-box;
  flex-wrap: ${({ $wrap }) => $wrap && 'wrap'};
  ${size}

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: ${({ mDirection }) => (mDirection ? 'row' : 'column')};
  }
`;

export const RowToCol = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(wrap) => wrap && 'wrap'};
  box-sizing: border-box;
  ${size}
  ${({ switchSize }) =>
    switchSize === 'tablet'
      ? css`
          @media ${({ theme }) => theme.device.tablet} {
            flex-direction: column;
          }
        `
      : css`
          @media ${({ theme }) => theme.device.mobile} {
            flex-direction: inherit;
          }
        `}
`;

export const ColToRow = styled.div`
  ${flexCol}
  ${size}
  @media ${({ theme }) => theme.device.tablet} {
    ${flexRow}
    flex-wrap: wrap;
  }
`;