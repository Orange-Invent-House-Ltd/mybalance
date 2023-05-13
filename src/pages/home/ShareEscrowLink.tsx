import React from 'react'
import Header from '../../components/home/Header'
import { Button } from '../../components/reuseable/Button'
import TextField from '../../components/reuseable/TextField1'

const ShareEscrowLink = () => {
  return (
    <div className='px-[5%]'>
      <Header/>
      <div className='w-fit mx-auto mt-[50px]'>
        <h6 className='h6'>TMusty Shared an Escrow Link With You</h6>
        <form action="">
            <h1 className="text-[#EDEDED] text-lg font-medium mb-2 ">
              ITEM(S) INFORMATION
            </h1>
            <div className="flex flex-col gap-4">
              <TextField label="Purpose of escrow" placeholder="e.g 20,000" />
              <TextField
                label="Type of item(s)"
                placeholder="****"
              />
              <TextField
                label="Number of item(s)"
                placeholder="give a description"
              />
              <TextField
                label="Amount"
                placeholder="give a description"
              />
              <TextField
                label="Delivery timeline"
                placeholder="Select number of days"
              />
            </div>
            <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
              VENDOR ACCOUNT INFORMATION
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <TextField label="Bank Name" placeholder="Access Bank" />
              <TextField label="Enter Account number" placeholder="1234567890"/>
              <TextField label="Account Name" placeholder="e.g JMusty Feet"/>
              <TextField label="Email" placeholder="e.g JMustyfeet@gmail.com"/>
              <TextField
                label="Phone number"
                placeholder="090123456789"
              />
            </div>
            <div className="mt-6 mb-16">
              <Button fullWidth> Pay now </Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ShareEscrowLink