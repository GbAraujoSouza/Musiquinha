import React from "react";
import { Container, HeaderTitle } from "./styles";
import { Image } from "expo-image";
import DefaultUserProfile from "../../assets/default-user-profile.png";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return (
    <Container>
      <Image source={DefaultUserProfile}/>
      <HeaderTitle>{text}</HeaderTitle>
    </Container>
  );
};

export default Header;
