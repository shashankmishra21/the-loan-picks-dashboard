import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { askAboutProduct } from '@/lib/gemini'
import { chatMessageSchema } from '@/schemas/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = chatMessageSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    const { product_id, message, history } = validation.data

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const response = await askAboutProduct(product, message, history || [])

    
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}