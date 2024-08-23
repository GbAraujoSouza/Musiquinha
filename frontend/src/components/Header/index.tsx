import React from "react";
import { Container, HeaderImage, HeaderInfo, HeaderTitle } from "./styles";
import DefaultUserProfile from "../../assets/default-user-profile.png";
import { Pressable, View } from "react-native";
import { icons } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  const { logout } = useAuth();

  return (
    <Container>
      <HeaderInfo>
        <HeaderImage source={DefaultUserProfile} />
        <HeaderTitle>{text}</HeaderTitle>
      </HeaderInfo>

      <View>
        <Pressable onPress={() => logout()}>
          <icons.exit />
        </Pressable>
      </View>
    </Container>
  );
};

export default Header;
