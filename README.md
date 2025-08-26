# How Many Karaks Is That? ☕

A fun web application that converts any AED (UAE Dirham) amount into the number of karak chai cups you could buy - because that's the only metric that truly matters in the UAE!

## Features

- 💰 **Currency Conversion**: Enter any AED amount and see how many karak cups it equals
- ☕ **Visual Display**: See your karak collection with cup emojis
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🇦🇪 **UAE Culture**: Features the new official UAE Dirham symbol
- 🎭 **Humorous Messages**: Get funny messages based on your karak count
- 📊 **Fun Facts**: Learn interesting facts about karak consumption in the UAE

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui with Radix UI primitives
- **Font**: Bricolage Grotesque (Google Fonts)
- **Icons**: Lucide React
- **Currency Symbol**: Official new UAE Dirham symbol (SVG)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main calculator page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   └── ui/
│       ├── dirham-symbol.tsx  # UAE Dirham symbol component
│       ├── button.tsx         # Button component
│       ├── card.tsx           # Card components
│       ├── dialog.tsx         # Dialog components
│       ├── input.tsx          # Input component
│       └── badge.tsx          # Badge component
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Key Features Explained

### Karak Price Calculation
- Based on average karak price of 1.5 AED per cup
- Calculates how many full cups you can afford
- Displays humorous messages based on quantity

### UAE Dirham Symbol
- Uses the official new UAE Dirham symbol
- Implemented as an SVG component for crisp rendering
- Properly positioned and sized for different contexts

### Typography
- Bricolage Grotesque font with multiple weights
- Strategic use of font weights for visual hierarchy
- Proper text alignment and spacing

## Cultural Context

Karak chai is more than just tea in the UAE - it's a cultural phenomenon that brings people together. This app playfully acknowledges how central karak is to daily life by using it as a unit of measurement for any price.

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Adding more cultural elements

## License

This project is open source and available under the MIT License.
