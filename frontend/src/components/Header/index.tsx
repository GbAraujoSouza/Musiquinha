import React from "react";
import { Container, HeaderImage, HeaderInfo, HeaderTitle } from "./styles";
import { Pressable, View } from "react-native";
import { icons, images } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  const { logout } = useAuth();

  return (
    <Container>
      <HeaderInfo>
        <HeaderImage source={images.DefaultUserProfile} />
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
