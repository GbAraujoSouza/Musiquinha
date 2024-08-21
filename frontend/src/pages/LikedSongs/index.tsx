import React from "react";
import { SemiboldText } from "../../theme/globalFonts";
import { Container, HeaderContainer, HeaderTitle, SongsCount } from "./styles";
import { ScrollView } from "react-native";
import TrackList from "../../components/TrackList";
import library from "../../assets/data/library.json";

const LikedSongs = () => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Liked Songs</HeaderTitle>
        <SongsCount>xx musics</SongsCount>
      </HeaderContainer>

      <TrackList tracks={library} />
    </Container>
  );
};

export default LikedSongs;
