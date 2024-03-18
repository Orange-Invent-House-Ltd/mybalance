import React, { useState } from 'react';
import BlogButton from './BlogButton';
import Card from './BlogCard'; 
import user from '../../assets/images/user.jpg'

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
        {dummyDatas.map((dummyData, index) => (
          <Card key={index} data={dummyData} />
        ))}
      </div>
      <BlogButton onClick={toggleExpanded} />
    </div>
  );
}

const dummyDatas = [
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
];

export default BlogCardParent;
