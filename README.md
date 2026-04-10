# MarketMosaic AI

MarketMosaic AI is a high-performance trading dashboard built for the Deriv API competition. It combines real-time market data with Gemini AI intelligence to provide traders with a sophisticated, "mosaic" view of the markets.

## Features

- **Real-Time Execution**: Direct integration with Deriv WebSocket API for sub-second tick updates and trade execution.
- **AI Market Vibe Check**: Leverages Gemini 3.0 Flash to analyze recent price action and provide sentiment analysis.
- **Mosaic Layout**: A high-density, bento-grid inspired interface designed for professional traders.
- **Secure Authentication**: Client-side API token authorization.
- **Live Charts**: Interactive price action visualization using Recharts.

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Components**: shadcn/ui
- **Animations**: Motion (Framer Motion)
- **AI**: Google Gemini API (@google/genai)
- **API**: Deriv WebSocket API

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up your environment variables in `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the development server: `npm run dev`.
5. Open the app and enter your Deriv API token to start trading.

## Deployment

This app is designed to be easily deployed on **Vercel** or **Netlify**. Simply connect your GitHub repository and set the `GEMINI_API_KEY` environment variable in your deployment dashboard.
