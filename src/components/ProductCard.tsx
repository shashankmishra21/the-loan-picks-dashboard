import { Product } from '@/types/loan'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  isBestMatch?: boolean
  onAskQuestion?: () => void
}

export function ProductCard({ product, isBestMatch = false, onAskQuestion }: ProductCardProps) {
  return (
    <Card className={`p-5 transition-all hover:shadow-lg ${
      isBestMatch 
        ? 'bg-gradient-to-br from-[#001143] to-[#002a6b] text-white border-2 border-blue-400' 
        : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold">{product.bank}</div>
          <div className={`text-xs ${isBestMatch ? 'opacity-80' : 'text-gray-500'}`}>
            {product.type.replace('_', ' ')}
          </div>
        </div>
        {isBestMatch && (
          <Badge className="bg-yellow-400 text-purple-900 hover:bg-yellow-400">
            BEST MATCH
          </Badge>
        )}
      </div>

      <h3 className={`font-bold text-lg mb-3 ${isBestMatch ? 'text-white' : 'text-gray-900'}`}>
        {product.name}
      </h3>

      <div className={`text-center py-4 rounded-xl mb-4 ${
        isBestMatch 
          ? 'bg-white/10 backdrop-blur-sm' 
          : 'bg-gradient-to-br from-[#001143] to-[#002a6b] text-white border-2 border-blue-400'
      }`}>
        <div className={`text-3xl font-bold ${
          isBestMatch 
            ? 'text-white' 
            : 'text-white'
        }`}>
          {product.rate_apr}%
        </div>
        <div className={`text-xs mt-1 ${isBestMatch ? 'opacity-80' : 'text-white'}`}>
          Interest Rate p.a.
        </div>
      </div>

      <p className={`text-sm mb-4 line-clamp-2 ${isBestMatch ? 'opacity-90' : 'text-gray-600'}`}>
        {product.summary}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <div className={`text-xs ${isBestMatch ? 'opacity-70' : 'text-gray-500'}`}>Min Income</div>
          <div className="font-medium">₹{(product.min_income / 1000).toFixed(0)}K+</div>
        </div>
        <div>
          <div className={`text-xs ${isBestMatch ? 'opacity-70' : 'text-gray-500'}`}>Credit Score</div>
          <div className="font-medium">{product.min_credit_score}+</div>
        </div>
        <div>
          <div className={`text-xs ${isBestMatch ? 'opacity-70' : 'text-gray-500'}`}>Tenure</div>
          <div className="font-medium">{product.tenure_min_months}-{product.tenure_max_months}m</div>
        </div>
        <div>
          <div className={`text-xs ${isBestMatch ? 'opacity-70' : 'text-gray-500'}`}>Documents</div>
          <div className="font-medium capitalize">{product.docs_level}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={isBestMatch ? "secondary" : "outline"}
          className="flex-1"
          onClick={onAskQuestion}
        >
          Ask Questions
        </Button>
        <Button 
          className={`flex-1 ${
            isBestMatch 
              ? 'bg-[#1CFF7D] text-black hover:bg-[#18e070] font-semibold' 
              : 'bg-[#1CFF7D] text-black hover:bg-[#18e070] font-semibold'
          }`}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  )
}