import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

function Input(
  {
    width,
    height,
    mobileHeight,
    defaultValue,
    value,
    name,
    invalid,
    placeholder,
    onChange,
    onKeyUp,
    onKeyDown,
    readOnly,
    readOnlyNotCss,
    maxLength,
    ...props
  },
  ref,
) {
  const onKeyUpHandler = (e) => {
    if (onKeyUp) {
      if (e.key === 'Enter') {
        onKeyUp();
      }
    }
  };
  const onKeyDownHandler = (e) => {
    if (onKeyDown) {
      if (e.key === 'Enter') {
        onKeyDown();
      }
    }
  };
  return (
    <InputBox
      width={width}
      height={height}
      mobileHeight={mobileHeight}
      defaultValue={defaultValue}
      value={value}
      name={name}
      invalid={invalid === true}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp ? onKeyUp : onKeyUpHandler}
      onKeyDown={onKeyDown ? onKeyDown : onKeyDownHandler}
      readOnly={readOnly}
      readOnlyNotCss={readOnlyNotCss}
      autoComplete="off"
      maxLength={maxLength ? maxLength : 10000}
      ref={ref}
      {...props}
    />
  );
}

const InputBox = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: white;
  box-sizing: border-box;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '46px')};
  color: inherit;
  border: ${({ invalid, theme }) =>
    invalid ? `1px solid ${theme.colors.fontRed}` : `1px solid #c9c9c9`};
  border-radius: 2px;
  padding: 12px 10px;
  font-size: 100%;
  font-family: inherit;

  &:focus {
    border: ${({ invalid, theme }) =>
      invalid
        ? `1px solid ${theme.colors.fontRed}`
        : `2px solid ${theme.colors.point}`};
  }

  &::placeholder {
    font-size: 100%;
    color: ${({ theme }) => theme.colors.grayscale5};
  }

  ${({ readOnly, readOnlyNotCss, theme }) =>
    readOnly &&
    !readOnlyNotCss &&
    css`
      color: ${theme.colors.gray};
      background-color: ${theme.colors.backgroundGray};
      &:focus {
        border: 1px solid ${theme.colors.lightGray};
      }
    `}

  @media ${({ theme }) => theme.device.tablet} {
    height: ${({ mobileHeight }) => (mobileHeight ? mobileHeight : '38px')};
    font-size: 14px;

    &::placeholder {
      font-size: 14px;
    }
  }
`;

export default forwardRef(Input);