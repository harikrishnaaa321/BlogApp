import React from 'react'
import { useSelector } from 'react-redux'
import { Button, TextInput } from 'flowbite-react'
const DashProfile = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'></h1>
      <h1>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' /></div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}></TextInput>

        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>

        <TextInput type='password' id='password' placeholder='password'></TextInput>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline></Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>delete account</span>

        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
