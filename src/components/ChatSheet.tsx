'use client'

import { useState, useRef, useEffect } from 'react'
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
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMessages([])
    }, [product?.id])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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
            <SheetContent className="w-full sm:max-w-lg bg-white flex flex-col p-0">
                <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-[#001143] to-[#002a6b]">
                    <SheetTitle className="text-white">Ask about {product?.name}</SheetTitle>
                    <p className="text-sm text-white/80 mt-1">{product?.bank}</p>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#001143] to-[#002a6b] rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl"></span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Ask me anything!</h3>
                            <p className="text-sm text-gray-500">
                                I can help you with questions about this loan product
                            </p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-[#001143] to-[#002a6b] text-white rounded-br-sm'
                                        : 'bg-white shadow-sm border border-gray-200 rounded-bl-sm'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white shadow-sm border border-gray-200 p-3 rounded-2xl rounded-bl-sm">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            placeholder="Type your question..."
                            disabled={loading}
                            className="flex-1"
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="bg-[#1CFF7D] text-black hover:bg-[#18e070] font-semibold px-6"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}