import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const bank = searchParams.get('bank')
  const minApr = searchParams.get('minApr')
  const maxApr = searchParams.get('maxApr')
  const minIncome = searchParams.get('minIncome')
  const minCreditScore = searchParams.get('minCreditScore')

  let query = supabase.from('products').select('*')

  if (bank) {
    query = query.ilike('bank', `%${bank}%`)
  }

  if (minApr && maxApr) {
    query = query.gte('rate_apr', parseFloat(minApr)).lte('rate_apr', parseFloat(maxApr))
  }

  if (minIncome) {
    query = query.lte('min_income', parseInt(minIncome))
  }

  if (minCreditScore) {
    query = query.lte('min_credit_score', parseInt(minCreditScore))
  }

  const { data, error } = await query.order('rate_apr', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }


  return NextResponse.json({ products: data })
}