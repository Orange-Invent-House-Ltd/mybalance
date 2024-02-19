import React from 'react'

const TutorialVideo = ({src, title, client}: {src:string; title:string; client:string}) => {
  return (
    <div className='max-w-[402px]'>
      <iframe width="394" height="315" 
        src={src}
        title="MyBalance video tutorial player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen>
      </iframe>
      <div className='w-fit text-[14px] mt-4 px-4 rounded-lg border border-[#2D7738] bg-[#EBF4EC]'>{client}</div>
      <p className='text-[18px] font-medium'>{title}</p>
      
    </div>
  )
}

export default TutorialVideo