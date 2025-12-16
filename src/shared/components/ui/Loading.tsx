import { LucideLoader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
   <div className='flex items-center justify-center text-sm'>
    <LucideLoader2 className='mr-2 size-5 animate-spin'/>
    Завантаження...
   </div>
  )
}
