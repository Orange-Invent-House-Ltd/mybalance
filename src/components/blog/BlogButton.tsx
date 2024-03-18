import { ArrowDown } from 'lucide-react';


interface BlogButtonProps {
  onClick: () => void; // Define onClick prop type
}

function BlogButton({ onClick }: BlogButtonProps) {
  return (
    <div className='flex justify-center items-center w-full mt-6'>
      <button onClick={onClick} className='flex justify-center items-center gap-1 bg-primary-blog text-primary-blogCol p-2 px-4 rounded-lg mt-10 mb-[-30px]'>
        <span><ArrowDown size={25} /></span>
        <span className=' text-sm font-bold'>Load more</span>
      </button>
    </div>
  );
}

export default BlogButton;
