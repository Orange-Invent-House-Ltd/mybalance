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
      <div className='md:flex justify-center items-center gap-48 py-[200px] px-[5%]'>
        <div>
          <p className='font-normal text-[16px] text-primary-normal mb-2'>404 error</p>
          <h1 className='text-headingColor font-bold text-[32px] mb-2'>Page not found</h1>
          <p className='para mb-10'>Sorry, the page you are looking for doesn't exist.</p>
          <div className='flex gap-4 '>
            <div className='w-[145px]' onClick={()=>navigate(-1)}><Button fullWidth variant='black-outlined'><div className='flex gap-2'><img src={back} alt="back arrow"/> Go back</div></Button></div>
            <Link to='/'><Button>Take me home</Button></Link>
          </div>
        </div>
        <div>
          <img src={image404} alt="404 image" />
        </div>
      </div>
    </div>
  )
}

export default PageNotFound