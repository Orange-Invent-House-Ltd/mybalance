import React from 'react'
import { MdArrowDownward } from 'react-icons/md';


function BlogButton() {
  return (
    <div className='flex justify-center items-center w-full mt-6'>
        <button className='flex justify-center items-center gap-1 bg-primary-blog text-primary-blogCol p-2 px-4 rounded-lg mt-10 mb-[-30px]'>
            <span><MdArrowDownward /></span>
            <span className=' text-sm font-bold'>Load more</span>
        </button>
    </div>
  )
}

export default BlogButton