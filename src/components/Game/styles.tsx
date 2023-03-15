import styled from "styled-components";

export const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const QuestionText = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
`;

export const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const OptionButton = styled.button<{
  isSelected: boolean;
  isCorrect: boolean;
}>`
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

export const NextButton = styled.button`
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

export const MoneyBar = styled.div<{ money: number }>`
  background-color: #bbb;
  width: 100%;
  height: 20px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;

  &::before {
    content: "${(props) => props.money}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => `${(props.money / 1000000) * 100}%`};
    height: 100%;
    background-color: #1e88e5;
    border-radius: 8px;
  }
`;
