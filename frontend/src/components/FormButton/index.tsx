import React from "react";
import { LoginButton, LoginButtonText } from "./styles";

interface IFromButtonProps {
  text: string;
  onPress: () => {};
}

const FormButton = ({ text, onPress }: IFromButtonProps) => {
  return (
    <LoginButton onPress={onPress}>
      <LoginButtonText>{text}</LoginButtonText>
    </LoginButton>
  );
};

export default FormButton;
