import React, { useState } from "react";
import {
  GameContainer,
  QuestionText,
  OptionsList,
  OptionButton,
  NextButton,
  MoneyBar,
} from "./styles";
import { questions } from "./questions";

type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
  moneyLost: number;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

const initialMoney = 1000000;

const Game: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [money, setMoney] = useState(initialMoney);

  const handleOptionClick = (optionId: number) => {
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOptionId === null) {
      return;
    }

    const currentQuestion: Question = questions[currentQuestionIndex];
    const selectedOption: Option | undefined = currentQuestion.options.find(
      (option) => option.id === selectedOptionId
    );

    if (selectedOption?.isCorrect) {
      setScore(score + 1);
    } else {
      const moneyLost = selectedOption?.moneyLost || 0;
      setMoney((prevMoney) => prevMoney - moneyLost);
      if (money - moneyLost <= 0) {
        setGameOver(true);
      }
    }

    setSelectedOptionId(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setGameOver(currentQuestionIndex === questions.length - 1);
  };

  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <GameContainer>
      <MoneyBar money={money} />
      {gameOver ? (
        <>
          <QuestionText>
            Game over! You scored {score} out of {questions.length}.
          </QuestionText>
          <NextButton onClick={() => window.location.reload()}>
            Play Again
          </NextButton>
        </>
      ) : (
        <>
          <QuestionText>{currentQuestion.text}</QuestionText>
          <OptionsList>
            {currentQuestion.options.map((option) => (
              <li key={option.id}>
                <OptionButton
                  isSelected={option.id === selectedOptionId}
                  isCorrect={option.isCorrect}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.text}
                </OptionButton>
              </li>
            ))}
          </OptionsList>
          <NextButton
            disabled={selectedOptionId === null}
            onClick={handleNextQuestion}
          >
            Next
          </NextButton>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
