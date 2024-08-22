import React from "react";
import { Container, HeaderImage, HeaderTitle } from "./styles";
import DefaultUserProfile from "../../assets/default-user-profile.png";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return (
    <Container>
      <HeaderImage source={DefaultUserProfile}/>
      <HeaderTitle>{text}</HeaderTitle>
    </Container>
  );
};

export default Header;
