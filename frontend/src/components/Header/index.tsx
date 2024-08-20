import React from "react";
import { Container, HeaderTitle } from "./styles";
import { Image } from "react-native";
import DefaultUserProfile from "../../assets/default-user-profile.png";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return (
    <Container>
      <Image src={DefaultUserProfile} width={32} height={32}/>
      <HeaderTitle>{text}</HeaderTitle>
    </Container>
  );
};

export default Header;
