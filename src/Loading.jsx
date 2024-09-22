import React from 'react'
import { useTransition } from 'react-spring'

export default function Loading() {
  return (
    <>
    <div className='h-[50px] w-[50px] border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin'>
    </div>
    </>
    )
}
