import React from 'react'
import Header from '../../components/home/Header'
import { Button } from '../../components/reuseable/Button'
import { Link, useNavigate} from 'react-router-dom'
import back from '../../assets/Icons/black-back.svg'
import image404 from '../../assets/Icons/404.svg'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header/>
      <div className='md:flex flex-row-reverse justify-center items-center gap-32 mt-[100px] md:py-[100px] px-[5%]'>
        <div className='mb-10 md:mb-0 px-[5%] md:px-0'>
          <img src={image404} alt="404 image" />
        </div>
        <div className='min-w-[330px]'>
          <p className='font-normal text-[16px] text-primary-normal mb-2'>404 error</p>
          <h1 className='text-headingColor font-bold text-[32px] mb-2'>Page not found</h1>
          <p className='para mb-10'>Sorry, the page you are looking for doesn't exist.</p>
          <div className='md:flex gap-4 '>
            <div className='w-full md:w-[145px] mb-2 md:mb-0' onClick={()=>navigate(-1)}><Button fullWidth variant='black-outlined'><div className='flex justify-center gap-2'><img src={back} alt="back arrow"/> Go back</div></Button></div>
            <Link to='/'><div className='w-full md:w-[145px]'><Button fullWidth >Take me home</Button></div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound