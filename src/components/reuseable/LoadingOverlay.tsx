import React from 'react'
import loading from "../../assets/Icons/loadingSpinner.svg";
import ImagePreloader from './ImagePreloader';

const LoadingOverlay = () => {
    
  return (
    <div className=" h-full w-full flex items-end justify-center  absolute z-10 top-0 left-0 bg-white/70 hidde">
      <div className="mx-auto text-center space-y-5">
        {/* <ImagePreloader
          src={loading}
          className="animate-spin mx-auto "
          alt="loading spinner"
        /> */}
        <img
          src={loading}
          className="animate-spin mx-auto "
          alt="loading spinner"
        />
        <p>Loading! Please wait ...</p>
      </div>
    </div>
  );
}

export default LoadingOverlay