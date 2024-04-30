import React, { useState } from 'react'
import { Button } from '../../components/reuseable/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

const Test = () => {
  const [open, setOpen] = useState(false)
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  const generateWidgetSection = async() =>{
    try{
      const res = await axios.post(`${BASE_URL}/merchants/generate-widget-session`, 
        {customerEmail: 'tosxnthedesigner@gmail.com'}, 
        {
          headers: {
            'MerchantAPIKey': API_KEY,
          }}
    )
      // const res = fetch(`${BASE_URL}/auth/forgot-password`,
      // {
      //   // },
      // }) 
    }catch(error:any){
      toast.error(error.toString())
    }
  }

  return (
    <div className='p-[5%]'>
      <p className='mb-4'>API Service Connection Test</p>
      <Button
        onClick={()=>{
          generateWidgetSection()
        }}
      >Connect</Button>
      {open && (
        <iframe src="http://localhost:5173/" frameBorder="0"></iframe>
      )}

    </div>
  )
}

export default Test