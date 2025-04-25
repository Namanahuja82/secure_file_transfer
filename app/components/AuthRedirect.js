'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])
  
  return null // This component doesn't render anything
}