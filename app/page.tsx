"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Gift, Cake, PartyPopper } from "lucide-react"

interface PersonalizationData {
  name: string
  age: string
  message: string
}

const personalization = {
  name: "Ms.Swati",
  age: "",
  message: "You are a very strong baby doll, yet wishing you lots of strength, success and love",
}

export default function BirthdayGreeting() {
  const [currentScene, setCurrentScene] = useState(1)
  const [showTapPrompt, setShowTapPrompt] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const [countdownNumber, setCountdownNumber] = useState(3)

  useEffect(() => {
    if (currentScene === 1) {
      const timer = setTimeout(() => setCurrentScene(2), 4000)
      return () => clearTimeout(timer)
    }
  }, [currentScene])

  useEffect(() => {
    if (currentScene === 2) {
      const countdownInterval = setInterval(() => {
        setCountdownNumber((prev) => {
          if (prev > 1) {
            return prev - 1
          } else {
            clearInterval(countdownInterval)
            setTimeout(() => setCurrentScene(3), 500)
            return prev
          }
        })
      }, 1000)
      return () => clearInterval(countdownInterval)
    }
  }, [currentScene])

  useEffect(() => {
    if (currentScene === 3) {
      const timer = setTimeout(() => {
        setCurrentScene(4)
        setShowTapPrompt(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentScene])

  const handleTapToContinue = () => {
    if (currentScene === 4) {
      setCurrentScene(5)
      setShowTapPrompt(false)
    }
  }

  const handleCakeClick = () => {
    setCakeCut(true)
  }

  const resetAnimation = () => {
    setCurrentScene(1)
    setCakeCut(false)
    setShowTapPrompt(false)
    setCountdownNumber(3)
  }

  const MatrixText = ({ column, delay }: { column: number; delay: number }) => {
    const text = "HAPPY BIRTHDAY"
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{
          duration: 2,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute text-green-400 font-mono text-sm"
        style={{
          left: `${column * 8 + 5}%`,
          top: `${Math.random() * 80 + 10}%`,
          transform: `rotate(${Math.random() * 20 - 10}deg)`,
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  const BackgroundLetterGrid = () => {
    const letters = "HAPPY BIRTHDAY".split("")
    const gridSize = 20

    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(gridSize * gridSize)].map((_, i) => {
          const letter = letters[Math.floor(Math.random() * letters.length)]
          if (letter === " ") return null

          return (
            <motion.div
              key={i}
              className="absolute text-pink-400 font-mono text-xs md:text-sm select-none"
              style={{
                left: `${(i % gridSize) * (100 / gridSize)}%`,
                top: `${Math.floor(i / gridSize) * (100 / gridSize)}%`,
                filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))",
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {letter}
            </motion.div>
          )
        })}
      </div>
    )
  }

  const ParticleCountdown = ({ number }: { number: number }) => {
    const particleCount = 50

    return (
      <div className="relative">
        <motion.div
          key={number}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="text-8xl md:text-9xl font-bold text-pink-400 relative z-10"
          style={{
            filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))",
            fontFamily: "monospace",
          }}
        >
          {number}
        </motion.div>

        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`${number}-${i}`}
            className="absolute w-1 h-1 bg-pink-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              filter: "drop-shadow(0 0 4px rgba(236, 72, 153, 0.8))",
            }}
            animate={{
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: [1, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              delay: Math.random() * 0.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 overflow-hidden relative">
      <AnimatePresence>
        {currentScene === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white"
          >
            <div className="absolute inset-0 bg-black/20">
              {[...Array(12)].map((_, i) => (
                <MatrixText key={i} column={i} delay={i * 0.3} />
              ))}
            </div>

            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -100, -200],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  {i % 3 === 0 ? "🎈" : i % 3 === 1 ? "✨" : "🎉"}
                </motion.div>
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-center mb-8 z-10"
            >
              Get Ready...
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentScene === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <BackgroundLetterGrid />
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <ParticleCountdown number={countdownNumber} />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentScene === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
          >
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <Heart className="w-4 h-4 text-pink-300" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center z-10"
            >
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
              >
                Happy Birthday
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="text-3xl md:text-5xl font-semibold mb-8 text-yellow-300"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                {personalization.name}!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center space-x-4 mb-8"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentScene === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer"
            onClick={handleTapToContinue}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-center"
            >
              <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">There's something special waiting...</h3>
              {showTapPrompt && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg text-pink-200">
                  Tap anywhere to continue
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentScene === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
          >
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * window.innerWidth }}
                  animate={{
                    y: window.innerHeight + 100,
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white p-4 rounded-lg shadow-2xl transform rotate-3 z-10"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold">Beautiful Memories</p>
                </div>
              </div>
              <p className="text-gray-800 text-center font-handwriting text-lg">{personalization.message}</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => setCurrentScene(6)}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 z-10"
            >
              Continue the Celebration! 🎉
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentScene === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
          >
            <div className="absolute top-0 left-0 right-0 flex justify-around py-4 z-10">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="w-4 h-4 rounded-full bg-yellow-300"
                />
              ))}
            </div>

            {cakeCut && (
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: window.innerWidth / 2,
                      y: window.innerHeight / 2,
                      scale: 0,
                    }}
                    animate={{
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 1,
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#fd79a8"][
                        Math.floor(Math.random() * 6)
                      ],
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center z-10">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
              >
                Make a Wish!
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 cursor-pointer"
                onClick={handleCakeClick}
              >
                <Cake className="w-24 h-24 mx-auto text-yellow-300 hover:text-yellow-400 transition-colors" />
                {!cakeCut && <p className="text-lg mt-4 text-pink-200">Click the cake to cut it!</p>}
              </motion.div>

              {cakeCut && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300">
                    🎉 Happy Birthday {personalization.name}! 🎉
                  </h2>
                  <p className="text-lg text-pink-200 max-w-md mx-auto">
                    May all your dreams come true and may this year bring you endless joy and happiness!
                  </p>
                  <Button
                    onClick={resetAnimation}
                    className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <PartyPopper className="w-4 h-4 mr-2" />
                    Celebrate Again!
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
