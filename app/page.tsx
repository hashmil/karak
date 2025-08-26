"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DirhamSymbol } from "@/components/ui/dirham-symbol"
import { Info } from "lucide-react"

// Viewport-based virtual scrolling for full-page emoji display
function ViewportVirtualizedEmojis({ count }: { count: number }) {
  const [visibleEmojis, setVisibleEmojis] = useState<React.ReactElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const EMOJI_SIZE = 48 // Optimized emoji size
  const EMOJI_MARGIN = 8 // Reduced margin for better density
  const EMOJIS_PER_ROW = Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1200) / (EMOJI_SIZE + EMOJI_MARGIN))
  const ROW_HEIGHT = EMOJI_SIZE + EMOJI_MARGIN
  const BUFFER_ROWS = 3 // Reduced buffer for better performance
  
  const totalRows = Math.ceil(count / EMOJIS_PER_ROW)
  const totalHeight = totalRows * ROW_HEIGHT

  useEffect(() => {
    if (count === 0) {
      setVisibleEmojis([])
      return
    }

    const updateVisibleEmojis = () => {
      if (!containerRef.current) return
      
      const containerTop = containerRef.current.offsetTop
      const scrollTop = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Calculate which rows are visible
      const viewportStart = Math.max(0, scrollTop - containerTop)
      const viewportEnd = viewportStart + viewportHeight
      
      const startRow = Math.max(0, Math.floor(viewportStart / ROW_HEIGHT) - BUFFER_ROWS)
      const endRow = Math.min(totalRows, Math.ceil(viewportEnd / ROW_HEIGHT) + BUFFER_ROWS)
      
      const startIndex = startRow * EMOJIS_PER_ROW
      const endIndex = Math.min(count, endRow * EMOJIS_PER_ROW)
      
      const newVisibleEmojis = []
      for (let i = startIndex; i < endIndex; i++) {
        const row = Math.floor(i / EMOJIS_PER_ROW)
        const col = i % EMOJIS_PER_ROW
        
        newVisibleEmojis.push(
          <span
            key={i}
            className="absolute inline-block text-4xl floating-emoji"
            style={{
              top: row * ROW_HEIGHT,
              left: col * (EMOJI_SIZE + EMOJI_MARGIN) + EMOJI_MARGIN,
              animationDelay: `${(i * 0.05) % 2}s`,
              filter: `hue-rotate(${(i * 15) % 360}deg)`
            }}
          >
            ☕
          </span>
        )
      }
      
      setVisibleEmojis(newVisibleEmojis)
    }

    updateVisibleEmojis()
    window.addEventListener('scroll', updateVisibleEmojis, { passive: true })
    window.addEventListener('resize', updateVisibleEmojis, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateVisibleEmojis)
      window.removeEventListener('resize', updateVisibleEmojis)
    }
  }, [count, totalRows, EMOJIS_PER_ROW, ROW_HEIGHT])

  if (count === 0) return null

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: totalHeight }}
    >
      {visibleEmojis}
    </div>
  )
}

export default function KarakCalculator() {
  const [aedAmount, setAedAmount] = useState("")
  const [karakCount, setKarakCount] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Average price of karak chai in UAE (approximately 1-2 AED)
  const KARAK_PRICE = 1.5

  const calculateKarak = async () => {
    const amount = Number.parseFloat(aedAmount)
    if (isNaN(amount) || amount <= 0) return

    setIsCalculating(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const cups = Math.floor(amount / KARAK_PRICE)
    setKarakCount(cups)
    setIsCalculating(false)
  }

  const getHumorousMessage = (cups: number) => {
    if (cups === 0) return "Not even a sip! 😅"
    if (cups === 1) return "Just one cup - savor it! ☕"
    if (cups <= 5) return "Perfect for a small gathering! 🫖"
    if (cups <= 20) return "Enough for the whole family! 👨‍👩‍👧‍👦"
    if (cups <= 50) return "Time for a neighborhood chai party! 🎉"
    if (cups <= 100) return "You could open a small chai stall! 🏪"
    return "Congratulations, you're now a chai mogul! 👑"
  }

  const reset = () => {
    setAedAmount("")
    setKarakCount(null)
  }

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-6xl mb-4 floating-emoji">☕</div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">How Many Karaks Is That?</h1>
          <p className="text-muted-foreground font-medium">Convert any price into the only metric that truly matters</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium colorful-hover">
                <Info className="h-4 w-4 mr-1" />
                Fun Facts
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-accent font-semibold">Did you know?</DialogTitle>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>
                    The average person in the UAE drinks about 3-4 cups of karak per day. That&apos;s roughly{" "}
                    <DirhamSymbol size={16} className="inline align-baseline" />
                    {(KARAK_PRICE * 3.5 * 365).toFixed(0)} worth of karak annually!
                  </div>
                  <div>
                    Karak chai originated from the Indian subcontinent and has become an integral part of UAE culture,
                    bringing people together across all walks of life.
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {/* Calculator Card */}
        <Card className="border-2 rainbow-border shadow-lg colorful-hover bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-primary font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">The Karak Calculator</CardTitle>
            <CardDescription className="font-medium">Enter an amount in AED and discover its true value</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="aed-input" className="text-sm font-semibold text-foreground">
                Amount in AED
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground flex items-center">
                  <DirhamSymbol size={20} />
                </div>
                <Input
                  id="aed-input"
                  type="number"
                  placeholder="0.00"
                  value={aedAmount}
                  onChange={(e) => setAedAmount(e.target.value)}
                  className="pl-16 text-lg"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateKarak} disabled={!aedAmount || isCalculating} className="flex-1 font-semibold colorful-hover bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300">
                {isCalculating ? "Brewing..." : "Calculate Karaks"}
              </Button>
              <Button onClick={reset} variant="outline" disabled={!aedAmount && karakCount === null} className="font-semibold colorful-hover border-2">
                Reset
              </Button>
            </div>

            {/* Results */}
            {karakCount !== null && (
              <div className="mt-6 p-4 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-lg border-2 rainbow-border text-center space-y-3 bounce-in pulse-glow">
                <div className="text-4xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight">{karakCount.toLocaleString()}</div>
                <div className="text-lg font-medium text-foreground">cups of delicious karak chai</div>
                <Badge variant="secondary" className="text-sm font-medium bg-gradient-to-r from-secondary/20 to-accent/20 border border-accent/30">
                  {getHumorousMessage(karakCount)}
                </Badge>
                <div className="text-xs text-muted-foreground mt-2 font-medium">
                  Based on <DirhamSymbol size={14} className="inline align-baseline mr-0.5" />
                  {KARAK_PRICE} per cup
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {karakCount !== null && karakCount > 0 && (
        <div className="w-full mt-12 mb-8">
          <div className="text-center mb-8 bounce-in max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 tracking-tight">Your Karak Collection</h2>
            <p className="text-muted-foreground font-medium">Keep scrolling to see all {karakCount.toLocaleString()} cups! 🎯</p>
            {karakCount > 10000 && (
              <p className="text-xs text-muted-foreground mt-2 opacity-75">
                Pro tip: This might take a while... grab a real karak while you scroll! ☕
              </p>
            )}
          </div>
          <div className="w-full bg-gradient-to-b from-card/30 via-transparent to-card/30 px-4">
            <ViewportVirtualizedEmojis count={karakCount} />
          </div>
        </div>
      )}
    </div>
  )
}
