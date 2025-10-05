'use client'

import { useState, useEffect } from 'react'

interface AnimatedImageProps {
  src: string
  alt: string
  className?: string
  animation?: 'bounce' | 'pulse' | 'spin' | 'ping'
}

export default function AnimatedImage({ 
  src, 
  alt, 
  className = '', 
  animation = 'bounce' 
}: AnimatedImageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const animationClasses = {
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping',
  }

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <img
        src={src}
        alt={alt}
        className={`${className} ${animationClasses[animation]}`}
      />
    </div>
  )
}


