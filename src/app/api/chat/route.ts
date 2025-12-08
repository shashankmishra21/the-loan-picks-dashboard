import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { askAboutProduct } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { product_id, message, history } = await request.json()

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

    const response = await askAboutProduct(product, message, history)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}