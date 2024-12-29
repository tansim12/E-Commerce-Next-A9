import { motion, AnimatePresence } from 'framer-motion'

interface ThankYouMessageProps {
  isVisible: boolean
}

export function ThankYouMessage({ isVisible }: ThankYouMessageProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-forest-green text-beige text-center py-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <p className="text-xl font-semibold">Thank you for subscribing!</p>
          <p>Get ready for amazing camping adventures.</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

