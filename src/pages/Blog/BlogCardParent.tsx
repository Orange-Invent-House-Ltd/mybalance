import React, { useState } from 'react';
import { dummyData } from './BlogData';
import { CardData } from './Datatypes';
import BlogButton from './BlogButton';
import Card from './BlogCard'; 

function BlogCardParent() {
  const [expanded, setExpanded] = useState(false); 
  const [overflow, setOverflow] = useState('hidden'); 

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setOverflow(expanded ? 'hidden' : 'none'); 
  };

  return (
    <div className=' transition-all duration-700 ease-in-out'>
      <div className={`mt-[-170px] md:mt-[-200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-7 gap-x-8 md:px-14 h-${expanded ? 'full' : 'h'} overflow-${overflow} hover:cursor-pointer`}>
        {dummyData.map((cardData: CardData, index: number) => (
          <Card key={index} data={cardData} />
        ))}
      </div>
      <BlogButton onClick={toggleExpanded} />
    </div>
  );
}

export default BlogCardParent;
