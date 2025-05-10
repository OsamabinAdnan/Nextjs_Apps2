'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        if (darkMode){
            document.documentElement.classList.add('dark')
        }
        else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])
  return (
    <>
        <div className='top-2.5 right-4 fixed'>
            <Button
                onClick={()=>setDarkMode(!darkMode)}
                variant='outline'
                className='bg-transparent hover:bg-transparent border-1'
            >
                {darkMode ? '🌞':'🌙'}
            </Button>
        </div>
    </>
  )
}
