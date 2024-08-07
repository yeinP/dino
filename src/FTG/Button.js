import React from 'react';
import styled, { css } from 'styled-components';
import Text from './Text';
import { shadow, flexRow } from './CommonCss';
function Button({
  text,
  size,
  mobileSize,
  weight,
  onClick,
  padding,
  width,
  mobileWidth,
  height,
  mobileHeight,
  active,
  outline,
  black,
  color,
  activeColor,
  fontColor,
  borderColor,
  mr,
  ml,
  mt,
  mb,
  backgroundColor,
  mobileMr,
  mobileMl,
  mobileMt,
  mobileMb,
  disabled,
  children,
  boxShadow,
  ...props
}) {
  return (
    <ButtonContainer
      padding={padding}
      width={width}
      mobileWidth={mobileWidth}
      height={height}
      mobileHeight={mobileHeight}
      color={color}
      mr={mr}
      ml={ml}
      mt={mt}
      mb={mb}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      mobileMr={mobileMr}
      mobileMl={mobileMl}
      mobileMt={mobileMt}
      mobileMb={mobileMb}
      outline={outline}
      black={black}
      active={active}
      onClick={onClick}
      disabled={disabled}
      boxShadow={boxShadow}
      {...props}
    >
      {children}
      <Text
        weight={weight}
        color={activeColor || fontColor}
        size={size}
        mobileSize={mobileSize}
      >
        {text}
      </Text>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
${flexRow('center', 'center')}
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  min-width: ${({ width }) => (width ? `${width}px` : 'unset')};
  height: ${({ height }) => (height ? `${height}px` : '46px')};
  box-sizing: border-box;
  border: 1px solid ${({ borderColor }) =>
    borderColor ? borderColor : 'none'};
  border-radius: 2px;
  text-align: center;
  padding: ${({ padding }) => padding || '0px'};
  color: ${({ color, theme }) =>
    color ? (theme.colors[color] ? theme.colors[color] : color) : 'white'};
  background-color ${({ active, theme, backgroundColor }) =>
    active
      ? theme.colors.point
      : backgroundColor
      ? backgroundColor
      : theme.colors.lightGray};
  box-shadow: ${({ boxShadow }) => (boxShadow ? `${boxShadow}` : 'none')};

  ${({ outline, active, theme }) =>
    outline &&
    css`
      color: ${active ? theme.colors.point : theme.colors.lightGray};
      background-color: white;
      border: 1px solid ${active ? theme.colors.point : theme.colors.lightGray};
    `}

  ${({ black, active, theme }) =>
    black &&
    css`
      color: ${active ? theme.colors.fontBlack : theme.colors.lightGray};
      background-color: white;
      border: 1px solid
        ${active ? theme.colors.fontBlack : theme.colors.lightGray};
      ${active && shadow(0, 3, 8, 0.16)};
    `}

  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 'unset')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 'unset')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 'unset')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : 'unset')};
  transition: all 150ms;
  word-break: keep-all;
  white-space: nowrap;

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          &:hover {
            opacity: 0.5;
          }
        `}
 

  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ mobileWidth }) => (mobileWidth ? `${mobileWidth}px` : '100%')};
    min-width: ${({ mobileWidth }) =>
      mobileWidth ? `${mobileWidth}px` : 'unset'};
    height: ${({ mobileHeight }) =>
      mobileHeight ? `${mobileHeight}px` : '38px'};
    margin-top: ${({ mobileMt, mt }) =>
      mobileMt ? `${mobileMt}px` : mt ? `${mt}px` : '0'};
    margin-bottom: ${({ mobileMb, mb }) =>
      mobileMb ? `${mobileMb}px` : mb ? `${mb}px` : '0'};
    margin-right: ${({ mobileMr, mr }) =>
      mobileMr ? `${mobileMr}px` : mr ? `${mr}px` : '0'};
    margin-left: ${({ mobileMl, ml }) =>
      mobileMl ? `${mobileMl}px` : ml ? `${ml}px` : '0'};
  }
`;

export default Button;