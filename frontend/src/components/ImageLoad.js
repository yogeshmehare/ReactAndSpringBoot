
import React, { useState, useEffect } from 'react';

const ImageLoad = React.memo(({ src, placeholder = "", alt = "" }) => {
    const logo = `${process.env.PUBLIC_URL}/images/blur.jpg`;

  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(logo);

  useEffect(() => {
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      // When image is loaded replace the src and set loading to false
      setLoading(false);
      updateSrc(src);
    }
  }, [src])

  return (
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity .15s linear",
        alignContent:"center",
        alignSelf:"center"
      }}
      alt={alt}
      height={150}
      width={150}
    />
  )
});

export default ImageLoad;