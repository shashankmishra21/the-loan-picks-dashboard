'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/loan'

interface ShareButtonProps {

  product: Product
}

export function ShareButton({ product }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {

    const shareUrl = `${window.location.origin}/product/${product.id}`
    
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
        
      console.error('Failed to copy:', error)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="text-xs" >
      {copied ? '✓ Copied!' : 'Share'}
    </Button>
  )
}