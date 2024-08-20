import React from "react";
import Header from "../../components/Header";
import {
  Container,
  Divider,
  LibrayOptionContainer,
  OptionPressable,
  OptionsSection,
  OptionText,
} from "./styles";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import FavoriteIcon from "../../assets/icons/favorite-icon.svg";

const Library = ({ navigation }: any) => {
  return (
    <Container>
      <Header text="My Library" />
      <OptionsSection>
        <LibrayOptionContainer>
          <OptionPressable>
            <PlusIcon />
          </OptionPressable>
          <OptionText>Add New Playlist</OptionText>
        </LibrayOptionContainer>
        <LibrayOptionContainer>
          <OptionPressable>
            <FavoriteIcon />
          </OptionPressable>
          <OptionText>Your Liken Songs</OptionText>
        </LibrayOptionContainer>
      </OptionsSection>

      <Divider />


    </Container>
  );
};

export default Library;
