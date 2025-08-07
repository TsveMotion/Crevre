'use client'

import React, { useState, useEffect } from 'react'

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    // Use a more explicit date format to avoid timezone issues
    const launchDate = new Date(2024, 8, 1, 0, 0, 0).getTime() // Month is 0-indexed, so 8 = September
    
    console.log('Launch date:', new Date(launchDate))
    console.log('Current date:', new Date())

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = launchDate - now

      console.log('Time difference (ms):', difference)

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsLaunched(false)
      } else {
        setIsLaunched(true)
      }
    }

    // Update immediately
    updateCountdown()
    
    // Set up interval
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isLaunched) {
    return (
      <div className="bg-gradient-to-r from-crevre-gold/20 via-crevre-gold/10 to-crevre-gold/20 border border-crevre-gold/30 rounded-sm px-8 py-4 mb-12 shadow-sm">
        <p className="text-crevre-gold font-medium text-lg tracking-wide text-center">
          🎉 <span className="font-bold">WE'RE LIVE!</span> • Explore Our Collection Now
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-crevre-gold/20 via-crevre-gold/10 to-crevre-gold/20 border border-crevre-gold/30 rounded-sm px-8 py-6 mb-12 shadow-sm">
      <p className="text-crevre-gold font-medium text-sm tracking-wide text-center mb-4 uppercase">
        Official Launch Countdown
      </p>
      
      <div className="flex justify-center items-center space-x-6 mb-3">
        <div className="text-center">
          <div className="bg-crevre-gold/10 border border-crevre-gold/40 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-crevre-gold tabular-nums">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-crevre-gold/80 mt-1 font-medium">DAYS</p>
        </div>
        
        <div className="text-crevre-gold text-xl font-light">:</div>
        
        <div className="text-center">
          <div className="bg-crevre-gold/10 border border-crevre-gold/40 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-crevre-gold tabular-nums">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-crevre-gold/80 mt-1 font-medium">HOURS</p>
        </div>
        
        <div className="text-crevre-gold text-xl font-light">:</div>
        
        <div className="text-center">
          <div className="bg-crevre-gold/10 border border-crevre-gold/40 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-crevre-gold tabular-nums">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-crevre-gold/80 mt-1 font-medium">MIN</p>
        </div>
        
        <div className="text-crevre-gold text-xl font-light">:</div>
        
        <div className="text-center">
          <div className="bg-crevre-gold/10 border border-crevre-gold/40 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-crevre-gold tabular-nums">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-crevre-gold/80 mt-1 font-medium">SEC</p>
        </div>
      </div>
      
      <p className="text-center text-crevre-gold font-medium text-lg">
        September 1st • Exclusive Collection Drops
      </p>
    </div>
  )
}

export default LaunchCountdown
