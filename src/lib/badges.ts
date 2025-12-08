import { Product, Badge as BadgeType } from '@/types/loan'

export function generateBadges(product: Product): BadgeType[] {
  const badges: BadgeType[] = []

  if (product.rate_apr < 9) {
    badges.push({ text: 'Low APR', variant: 'default', icon: '💰' })
  }

  if (product.disbursal_speed === 'fast') {
    badges.push({ text: 'Fast Approval', variant: 'secondary', icon: '⚡' })
  }

  if (product.prepayment_allowed) {
    badges.push({ text: 'No Prepayment Fee', variant: 'outline', icon: '✓' })
  }

  if (product.docs_level === 'low') {
    badges.push({ text: 'Minimal Docs', variant: 'secondary', icon: '📄' })
  }

  if (product.min_credit_score <= 700) {
    badges.push({ text: 'Easy Eligibility', variant: 'default', icon: '👍' })
  }

  return badges.slice(0, 3)
}