
import React from 'react';
import Card  from './BlogCard'
import { dummyData } from './BlogData';
import { CardData } from './Datatypes'; // Alias the CardData interface as BlogCardData
import BlogButton from './BlogButton';

function BlogCardParent() {
  return (
    <>
    <div className='mt-[-170px] md:mt-[-200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-7 gap-x-8 md:px-14 '>
      {dummyData.map((cardData: CardData, index: number) => (
        <Card key={index} data={cardData} />
      ))}
    </div>
      <BlogButton/>
    </>
  );
}

export default BlogCardParent;
