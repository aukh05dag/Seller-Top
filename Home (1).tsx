import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Rocket, Lock, CheckCircle2 } from 'lucide-react'

export default function Home() {
  const [marketplace, setMarketplace] = useState('Ozon')
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [resultData, setResultData] = useState({ marketplace: '', maskedKey: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) return

    setIsLoading(true)

    // Имитация подключения к API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResultData({
      marketplace,
      maskedKey: apiKey.substring(0, 4) + '****',
    })

    setIsLoading(false)
    setShowSuccess(true)
  }

  const handleClose = () => {
    setShowSuccess(false)
    setApiKey('')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full p-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center font-bold text-lg text-white">
            S
          </div>
          <div>
            <div className="font-bold text-xl text-white">SellAI</div>
            <div className="text-xs text-slate-400">AI Seller Analytics</div>
          </div>
        </div>

        <div className="glass px-4 py-2 rounded-full text-sm text-white/90">
          MVP 1.0
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-4 py-12">
        <div className="glass w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-float">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
              <Rocket className="w-4 h-4" />
              AI Аудит Магазина
            </div>

            <h1 className="text-4xl font-bold mb-3 text-white">
              Подключите кабинет
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              SellAI автоматически проанализирует продажи, конкурентов, карточки
              товаров и найдет точки роста прибыли.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Маркетплейс
              </label>
              <Select value={marketplace} onValueChange={setMarketplace}>
                <SelectTrigger className="w-full bg-slate-900/50 border-slate-700 rounded-xl p-4 h-auto text-white focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="Ozon">Ozon</SelectItem>
                  <SelectItem value="Wildberries">Wildberries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                API-ключ (Read Only)
              </label>
              <Input
                type="password"
                required
                placeholder="Введите API-ключ"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-900/50 border-slate-700 rounded-xl p-4 h-auto text-white placeholder:text-slate-500 focus:border-blue-500 focus-visible:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 py-4 h-auto rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:scale-[1.02] hover:shadow-2xl"
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="loader" />
                  Подключение...
                </div>
              ) : (
                'ПРОВЕСТИ ИИ-АУДИТ'
              )}
            </Button>
          </form>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Lock className="w-3 h-3" />
            Ключ используется только для чтения данных
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={handleClose}>
        <DialogContent className="glass-strong border-slate-700 rounded-3xl p-8 max-w-md w-full text-center">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white">
              Подключение выполнено
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-base space-y-2">
              <p>
                Маркетплейс:{' '}
                <span className="text-white font-semibold">
                  {resultData.marketplace}
                </span>
              </p>
              <p>
                Ключ:{' '}
                <span className="text-white font-semibold">
                  {resultData.maskedKey}
                </span>
              </p>
              <p className="pt-2 text-sm">
                В следующей версии здесь откроется аналитический дашборд SellAI.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 h-auto rounded-xl font-semibold transition"
            >
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
