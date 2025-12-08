'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/loan'
import { ProductCard } from '@/components/ProductCard'
import { ChatSheet } from '@/components/ChatSheet'

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [chatOpen, setChatOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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
    const handleAskQuestion = (product: Product) => {
        setSelectedProduct(product)
        setChatOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Your Top Loan Matches</h1>
                <p className="text-gray-600 mb-8">Personalized loans based on your profile</p>

                <div className="space-y-6">
                    {bestMatch && (
                        <div>
                            <ProductCard product={bestMatch} isBestMatch={true} onAskQuestion={() => handleAskQuestion(bestMatch)} />
                        </div>
                    )}

                    {otherMatches.length > 0 && (
                        <>
                            <h2 className="text-xl font-semibold mt-8 mb-4">More Matches for You</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {otherMatches.map((product) => (
                                    <ProductCard key={product.id} product={product} onAskQuestion={() => handleAskQuestion(bestMatch)} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ChatSheet product={selectedProduct} open={chatOpen} onOpenChange={setChatOpen} />
        </div>
    )
}