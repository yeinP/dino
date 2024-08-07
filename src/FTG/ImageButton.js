import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { backgroundCenter } from './CommonCss';
import Image from './Image';

function ImageButton({
  onClick,
  src,
  width,
  height,
  mobileWidth,
  mobileHeight,
  mr,
  ml,
  mt,
  mb,
  padding,
  setRef,
  radius,
  alt,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (src) {
      setLoading(false);
    }

    return () => setLoading(true);
  }, [src]);

  return (
    !loading && (
      <ImageButtonbutton
        ref={setRef}
        mr={mr}
        ml={ml}
        mt={mt}
        mb={mb}
        padding={padding}
        onClick={onClick}
        radius={radius}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          mobileWidth={mobileWidth}
          mobileHeight={mobileHeight}
          radius={radius}
        />
      </ImageButtonbutton>
    )
  );
}

const ImageButtonbutton = styled.button`
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 'unset')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 'unset')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 'unset')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : 'unset')};
  padding: ${({ padding }) => padding || 'unset'};
  box-sizing: border-box;
  border-radius: ${({ radius }) => (radius ? `${radius}` : 'unset')};
  ${backgroundCenter}
`;

export default ImageButton;