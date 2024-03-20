import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface BlogButtonProps {
  onClick: () => void; // Define onClick prop type
  expanded: boolean; // Define expanded prop type
}

function BlogButton({ onClick, expanded }: BlogButtonProps) {
  return (
    <div className='flex justify-center items-center w-full mt-6'>
      <button onClick={onClick} className='flex justify-center items-center gap-1 bg-primary-blog text-primary-blogCol p-2 px-4 rounded-lg mt-10 mb-[-30px]'>
        <span>{expanded ? <ArrowUp size={25} /> : <ArrowDown size={25} />}</span>
        <span className='text-sm font-bold'>{expanded ? 'Show less' : 'Load more'}</span>
      </button>
    </div>
  );
}

export default BlogButton;
