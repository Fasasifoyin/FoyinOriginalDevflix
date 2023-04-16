import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <Oval
  height={70}
  width={70}
  color="white"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="black"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
    </div>
  )
}

export default Loading