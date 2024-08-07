import React from 'react';
import styled, { css } from 'styled-components';

function Text({
  setRef,
  size,
  mobileSize,
  weight,
  mobileWeight,
  lineHeight,
  mobileLineHeight,
  color,
  mr,
  ml,
  mt,
  mb,
  pr,
  pl,
  pt,
  pb,
  mobilePt,
  mobilePr,
  mobilePb,
  mobilePl,
  mobileMr,
  mobileMl,
  mobileMt,
  mobileMb,
  align,
  children,
  line,
  whiteSpace,
  wordBreak,
  ...props
}) {
  return (
    <TextP
      ref={setRef}
      size={size}
      mobileSize={mobileSize}
      weight={weight}
      mobileWeight={mobileWeight}
      lineHeight={lineHeight}
      mobileLineHeight={mobileLineHeight}
      color={color}
      mr={mr}
      ml={ml}
      mt={mt}
      mb={mb}
      mobileMr={mobileMr}
      mobileMl={mobileMl}
      mobileMt={mobileMt}
      mobileMb={mobileMb}
      pr={pr}
      pl={pl}
      pt={pt}
      pb={pb}
      mobilePt={mobilePt}
      mobilePr={mobilePr}
      mobilePb={mobilePb}
      mobilePl={mobilePl}
      align={align}
      line={line}
      whiteSpace={whiteSpace}
      wordBreak={wordBreak}
      {...props}
    >
      {children}
    </TextP>
  );
}

const TextP = styled.p`
  color: ${({ color, theme }) =>
    color ? (theme.colors[color] ? theme.colors[color] : color) : 'inherit'};
  font-size: ${({ size }) => (size ? `${size / 16}rem` : '1rem')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 'inherit')};
  font-weight: ${({ weight }) => weight || 'inherit'};
  margin-top: ${({ mt }) => mt && `${mt}px`};
  margin-bottom: ${({ mb }) => mb && `${mb}px`};
  margin-right: ${({ mr }) => mr && `${mr}px`};
  margin-left: ${({ ml }) => ml && `${ml}px`};
  padding-top: ${({ pt }) => pt && `${pt}px`};
  padding-bottom: ${({ pb }) => pb && `${pb}px`};
  padding-right: ${({ pr }) => pr && `${pr}px`};
  padding-left: ${({ pl }) => pl && `${pl}px`};
  text-align: ${({ align }) => align || 'inherit'};
  white-space: ${({ whiteSpace }) => (whiteSpace ? `${whiteSpace}` : 'unset')};
  word-break: ${({ wordBreak }) => (wordBreak ? `${wordBreak}` : 'unset')};
  ${({ line }) =>
    line &&
    (line === 1
      ? css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `
      : css`
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: ${line};
          -webkit-box-orient: vertical;
        `)}
  &.ir {
    content: '';
    overflow: hidden;
    position: absolute;
    text-indent: -9999px;
    line-height: 0;
    font-size: 1px;
    color: transparent;
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ mobileSize, size }) =>
      mobileSize
        ? `${mobileSize / 16}rem`
        : size
        ? `${size / 16}rem`
        : '0.875rem'};
    line-height: ${({ mobileLineHeight }) => mobileLineHeight || 'inherit'};
    margin-top: ${({ mobileMt, mt }) =>
      mobileMt ? `${mobileMt}px` : mt ? `${mt}px` : '0'};
    margin-bottom: ${({ mobileMb, mb }) =>
      mobileMb ? `${mobileMb}px` : mb ? `${mb}px` : '0'};
    margin-right: ${({ mobileMr, mr }) =>
      mobileMr ? `${mobileMr}px` : mr ? `${mr}px` : '0'};
    margin-left: ${({ mobileMl, ml }) =>
      mobileMl ? `${mobileMl}px` : ml ? `${ml}px` : '0'};

    padding-top: ${({ mobilePt, pt }) =>
      mobilePt ? `${mobilePt}px` : pt ? `${pt}px` : '0'};
    padding-bottom: ${({ mobilePb, pb }) =>
      mobilePb ? `${mobilePb}px` : pb ? `${pb}px` : '0'};
    padding-right: ${({ mobilePr, pr }) =>
      mobilePr ? `${mobilePr}px` : pr ? `${pr}px` : '0'};
    padding-left: ${({ mobilePl, pl }) =>
      mobilePl ? `${mobilePl}px` : pl ? `${pl}px` : '0'};
    font-weight: ${({ mobileWeight, weight }) =>
      mobileWeight ? mobileWeight : weight ? weight : 'inherit'};
  }
`;

export default Text;