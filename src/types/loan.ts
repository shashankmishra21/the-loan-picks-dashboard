export type LoanType = 
  | 'personal' 
  | 'education' 
  | 'vehicle' 
  | 'home' 
  | 'credit_line' 
  | 'debt_consolidation'

export interface Product {
  id: string
  name: string
  bank: string
  type: LoanType
  rate_apr: number
  min_income: number
  min_credit_score: number
  tenure_min_months: number
  tenure_max_months: number
  processing_fee_pct: number
  prepayment_allowed: boolean
  disbursal_speed: 'fast' | 'standard' | 'slow'
  docs_level: 'low' | 'standard' | 'high'
  summary: string
  faq: Array<{ q: string; a: string }>
  terms: Record<string, any>
  created_at?: string
}

export interface ChatMessage {
  product_id: string
  role: 'user' | 'assistant'
  content: string
}

export interface Badge {
  text: string
  variant: 'default' | 'secondary' | 'outline' | 'destructive'
  icon?: string
}