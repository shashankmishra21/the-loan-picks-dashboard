import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(apiKey)

export async function askAboutProduct(
  productData: any,
  userMessage: string,
  chatHistory: Array<{ role: string; content: string }>
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const systemPrompt = `You are a helpful loan assistant. Answer questions ONLY about this product:

Product: ${productData.name}
Bank: ${productData.bank}
APR: ${productData.rate_apr}%
Min Income: ₹${productData.min_income}
Min Credit Score: ${productData.min_credit_score}

If asked about anything else, politely say you can only answer about this loan product.`

  const chat = model.startChat({
    history: chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })),
  })

  const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userMessage}`)
  return result.response.text()
}