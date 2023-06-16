import React, { useEffect, useState } from "react";

function ImagePreloader({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.addEventListener("load", () => {
      setIsLoaded(true);
    });

    return () => {
      // Clean up the event listener if the component unmounts
      img.removeEventListener("load", () => {
        setIsLoaded(true);
      });
    };
  }, [src]);

  return (
    <>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && <img src={src} alt={alt} className={className} />}
    </>
  );
}

export default ImagePreloader;
