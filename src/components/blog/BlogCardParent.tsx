import React, { useState } from 'react';
import BlogButton from './BlogButton';
import Card from './BlogCard';
import user from '../../assets/images/user.jpg';
import user2 from '../../assets/images/shirt_50.png';
import { Link } from 'react-router-dom';

function BlogCardParent() {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState('hidden');

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setOverflow(expanded ? 'hidden' : 'visible');
  };

  return (
    <div className='transition-all duration-700 ease-in-out'>
      <div className={`mt-[-170px] md:mt-[-200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-8 md:px-14 ${expanded ? 'h-full' : 'h-98'} overflow-${overflow} hover:cursor-pointer`}>
        {dummyDatas.map((dummyData, index) => (
          <Link key={index} to={`/blog/${dummyData.id}/details`} state={{ blogData: dummyData }}>
            <Card data={dummyData} state={{ blogData: dummyData }} />
          </Link>
        ))}
      </div>
      <BlogButton onClick={toggleExpanded} expanded={expanded} />
    </div>
  );
}



const dummyDatas = [
  {
    id:1,
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:2,
    imgs: user2 ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Johny Raymond',
    date:'20 Jan 2022'

  },
  {
    id:3,
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:4,
    imgs: user2 ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:5,
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:6,
    imgs: user2 ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:7,
    imgs: user ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:8,
    imgs: user2 ,
    subheading:'Design',
    title: 'How collaboration makes us better designers',
    description: 'Collaboration can make our teams stronger, and our individual designs better.',
    userprofile: user,
    name:'Olivia Rhye',
    date:'20 Jan 2022'

  },
  {
    id:9,
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
