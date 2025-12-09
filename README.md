# Loan Picks Dashboard

A modern loan comparison dashboard built with Next.js 14, featuring AI-powered chat assistance and smart filtering.

## Features

- **Smart Matching**: Top 5 personalized loan recommendations
- **AI Chat Assistant**: Ask questions about loan products using Gemini AI
- **Advanced Filters**: Filter by bank, income, credit score, and APR
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Real-time Data**: Powered by Supabase PostgreSQL database

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Validation**: Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
https://github.com/shashankmishra21/the-loan-picks-dashboard.git

cd the-loan-picks-dashboard


2. Install dependencies
npm install


3. Set up environment variables

Create a `.env.local` file:
NEXT_PUBLIC_SUPABASE_URL=_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=_supabase_anon_key
NEXT_PUBLIC_GEMINI_API_KEY=_gemini_api_key


4. Run the development server


Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)


## Features in Detail

### AI Chat Assistant
- Context-aware responses about loan products
- Chat history maintained per product
- Powered by Google Gemini AI

### Smart Filtering
- Filter by bank name
- Minimum income requirements
- Credit score requirements
- Maximum APR threshold

### Share Functionality
- Copy shareable link to clipboard
- Quick sharing with one click

## Deployment

This project is deployed on Vercel. Any push to `main` branch triggers automatic deployment.

## Author

Shashank Mishra

## License

MIT


