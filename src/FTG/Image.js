import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { fadein } from './CommonCss';

function ImageComponent({
  setRef,
  src,
  radius,
  width,
  height,
  mobileWidth,
  mobileHeight,
  mr,
  ml,
  mt,
  mb,
  mobileMr,
  mobileMl,
  mobileMt,
  mobileMb,
  pr,
  pl,
  pt,
  pb,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        setLoading(false);
      };
    }

    return () => setLoading(false);
  }, [src]);

  return loading ? (
    <></>
  ) : (
    src && (
      <ImageImg
        ref={setRef}
        radius={radius}
        width={width}
        height={height}
        mobileWidth={mobileWidth}
        mobileHeight={mobileHeight}
        src={src}
        $loading={!loading}
        mr={mr}
        ml={ml}
        mt={mt}
        mb={mb}
        mobileMr={mobileMr}
        mobileMl={mobileMl}
        mobileMt={mobileMt}
        mobileMb={mobileMb}
        pt={pt}
        pr={pr}
        pl={pl}
        pb={pb}
        {...props}
      />
    )
  );
}

const ImageImg = styled.img`
  object-fit: contain;
  width: ${({ width }) => (width ? `${width}px !important` : 'inherit')};
  height: ${({ height }) => (height ? `${height}px !important` : 'inherit')};
  margin-top: ${({ mt }) => mt && `${mt}px`};
  margin-bottom: ${({ mb }) => mb && `${mb}px`};
  margin-right: ${({ mr }) => mr && `${mr}px`};
  margin-left: ${({ ml }) => ml && `${ml}px`};
  border-radius: ${({ radius }) => radius && `${radius}`};
  padding-top: ${({ pt }) => pt && `${pt}px`};
  padding-bottom: ${({ pb }) => pb && `${pb}px`};
  padding-right: ${({ pr }) => pr && `${pr}px`};
  padding-left: ${({ pl }) => pl && `${pl}px`};

  ${({ $loading }) =>
    $loading
      ? css`
          visibility: visible;
          -webkit-animation: ${fadein} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1)
            both;
          animation: ${fadein} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        `
      : css`
          visibility: hidden;
        `}
  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ width, mobileWidth }) =>
      mobileWidth
        ? Number(mobileWidth)
          ? `${mobileWidth}px !important`
          : `${mobileWidth} !important`
        : width
        ? Number(width)
          ? `${width}px`
          : width
        : 'unset'};
    height: ${({ mobileHeight }) =>
      mobileHeight ? `${mobileHeight}px !important` : 'inherit'};
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

export default ImageComponent;