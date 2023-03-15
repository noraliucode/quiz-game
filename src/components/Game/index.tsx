import React, { useState } from "react";
import styled from "styled-components";

type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: [
      { id: 1, text: "Paris", isCorrect: true },
      { id: 2, text: "London", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "What is the largest planet in our solar system?",
    options: [
      { id: 3, text: "Venus", isCorrect: false },
      { id: 4, text: "Jupiter", isCorrect: true },
    ],
  },
  // add more questions here
];

const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionButton = styled.button<{ isSelected: boolean; isCorrect: boolean }>`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) =>
    props.isSelected ? (props.isCorrect ? "#67C240" : "#E53935") : "white"};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isCorrect ? "#2E7D32" : "#C62828")};
  }
`;

const NextButton = styled.button`
  font-size: 18px;
  padding: 10px;
  margin: 20px;
  border-radius: 8px;
  border: none;
  background-color: #1e88e5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const Game: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const handleOptionClick = (optionId: number) => {
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOptionId === null) {
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedOptionId
    );

    if (selectedOption?.isCorrect) {
      setScore(score + 1);
    } else {
      setGameOver(true);
    }

    setSelectedOptionId(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setGameOver(currentQuestionIndex === questions.length - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <GameContainer>
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
