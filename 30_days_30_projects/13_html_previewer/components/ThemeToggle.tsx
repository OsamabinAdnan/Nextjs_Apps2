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

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

  return (
    <div className=''>
        <Button
            onClick={toggleTheme}
            variant={'outline'}
            className='hover:bg-transparent bg-transparent border-1'
        >
            {darkMode ? '🌞':'🌙'}
        </Button>
    </div>
  )
}
