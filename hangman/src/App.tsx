import {useCallback, useEffect, useState} from "react"
import words from './wordList.json'
import { HangmanDrawing } from "./Components/HangmanDrawing"
import { HangmanWord } from "./Components/HangmanWord"
import { Keyboard } from "./Components/Keyboard"

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

const App = () => {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [addGuessedLetter])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  })

  console.log(wordToGuess)

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{fontSize: "2rem", textAlign: "center", color: isWinner ? "green" : "red"}}>
        {isWinner && "Winner! - Press enter to start again!"}
        {isLoser && "You lost - Press enter to try again!"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}></HangmanDrawing>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}></HangmanWord>
      <div style={{alignSelf: "stretch"}}><Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}></Keyboard></div>
      
    </div>
  )
}

export default App
