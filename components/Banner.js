import React from "react";
import { Parallax } from 'react-parallax';

function Banner({ imageUrl, title, subtitle }) {
  return (
    <Parallax
      blur={0}
      bgImage={imageUrl}
      bgImageAlt="Banner"
      strength={500}
      className="relative w-full"
    >
      <div className="relative w-full h-[50vh] flex flex-col items-center justify-center text-center text-white">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 z-10">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <h2 className="text-2xl">{subtitle}</h2>
        </div>
      </div>
    </Parallax>
  );
}

export default Banner;
