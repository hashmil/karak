"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DirhamSymbol } from "@/components/ui/dirham-symbol"
import { Info } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-6xl mb-4">☕</div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">How Many Karaks Is That?</h1>
          <p className="text-muted-foreground font-medium">Convert any price into the only metric that truly matters</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
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
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-primary font-semibold">The Karak Calculator</CardTitle>
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
              <Button onClick={calculateKarak} disabled={!aedAmount || isCalculating} className="flex-1 font-semibold">
                {isCalculating ? "Brewing..." : "Calculate Karaks"}
              </Button>
              <Button onClick={reset} variant="outline" disabled={!aedAmount && karakCount === null} className="font-semibold">
                Reset
              </Button>
            </div>

            {/* Results */}
            {karakCount !== null && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 text-center space-y-3">
                <div className="text-4xl font-black text-primary tracking-tight">{karakCount.toLocaleString()}</div>
                <div className="text-lg font-medium text-foreground">cups of delicious karak chai</div>
                <Badge variant="secondary" className="text-sm font-medium">
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
        <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2 tracking-tight">Your Karak Collection</h2>
            <p className="text-muted-foreground font-medium">Scroll down to see all {karakCount.toLocaleString()} cups!</p>
          </div>
          <div className="text-center leading-relaxed text-2xl">
            {Array.from({ length: karakCount }, (_, i) => (
              <span key={i} className="inline-block m-1">
                ☕
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
