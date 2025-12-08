'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterBarProps {
  onFilter: (filters: FilterValues) => void
}

export interface FilterValues {
  bank?: string
  minIncome?: number
  minCreditScore?: number
  maxApr?: number
}

export function FilterBar({ onFilter }: FilterBarProps) {
  const [bank, setBank] = useState('')
  const [minIncome, setMinIncome] = useState('')
  const [minCreditScore, setMinCreditScore] = useState('')
  const [maxApr, setMaxApr] = useState('')

  const applyFilters = () => {
    const filters: FilterValues = {}
    
    if (bank) filters.bank = bank
    if (minIncome) filters.minIncome = parseInt(minIncome)
    if (minCreditScore) filters.minCreditScore = parseInt(minCreditScore)
    if (maxApr) filters.maxApr = parseFloat(maxApr)
    
    onFilter(filters)
  }

  const resetFilters = () => {
    setBank('')
    setMinIncome('')
    setMinCreditScore('')
    setMaxApr('')
    onFilter({})
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-semibold mb-4">Filter Loans</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="bank" className="text-sm">Bank</Label>
          <Input
            id="bank"
            placeholder="e.g. HDFC"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="income" className="text-sm">Min Income (₹)</Label>
          <Input
            id="income"
            type="number"
            placeholder="e.g. 25000"
            value={minIncome}
            onChange={(e) => setMinIncome(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="credit" className="text-sm">Min Credit Score</Label>
          <Input
            id="credit"
            type="number"
            placeholder="e.g. 700"
            value={minCreditScore}
            onChange={(e) => setMinCreditScore(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="apr" className="text-sm">Max APR (%)</Label>
          <Input
            id="apr"
            type="number"
            step="0.1"
            placeholder="e.g. 10"
            value={maxApr}
            onChange={(e) => setMaxApr(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={applyFilters} className="bg-[#001143] hover:bg-[#002a6b]">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}