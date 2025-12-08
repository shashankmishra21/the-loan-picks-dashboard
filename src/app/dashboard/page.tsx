'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/loan'
import { ProductCard } from '@/components/ProductCard'

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  const topProducts = products.slice(0, 5)
  const bestMatch = topProducts[0]
  const otherMatches = topProducts.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Top Loan Matches</h1>
        <p className="text-gray-600 mb-8">Personalized loans based on your profile</p>
        
        <div className="space-y-6">
          {bestMatch && (
            <div>
              <ProductCard product={bestMatch} isBestMatch={true} />
            </div>
          )}
          
          {otherMatches.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-8 mb-4">More Matches for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherMatches.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}