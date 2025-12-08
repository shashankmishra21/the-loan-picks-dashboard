'use client'

import { useState } from 'react'
import { Product, ChatMessage } from '@/types/loan'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatSheetProps {
    product: Product | null
    open: boolean
    onOpenChange: (open: boolean) => void
}


export function ChatSheet({ product, open, onOpenChange }: ChatSheetProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!input.trim() || !product) return

        const userMessage: ChatMessage = {
            product_id: product.id,
            role: 'user',
            content: input
        }


        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: product.id,
                    message: input,
                    history: messages
                })
            })

            const data = await res.json()

            const aiMessage: ChatMessage = {
                product_id: product.id,
                role: 'assistant',
                content: data.response
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Chat error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (

        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Ask about {product?.name}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full mt-4">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <p>Ask me anything about this loan product!</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-[#001143] text-white ml-8'
                                    : 'bg-gray-100 mr-8'
                                    }`}
                            >
                                <p className="text-sm">{msg.content}</p>
                            </div>
                        ))}


                        {loading && (
                            <div className="bg-gray-100 p-3 rounded-lg mr-8">
                                <p className="text-sm text-gray-500">Typing...</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your question..."
                            disabled={loading}
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="bg-[#1CFF7D] text-black hover:bg-[#18e070]"
                        >
                            Send
                        </Button>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}