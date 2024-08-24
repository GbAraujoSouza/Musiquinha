import React from "react";
import { Container, PlaylistImage, PlaylistTitle } from "./styles";
import mapSongToTrack from "../../helpers/mapSongToTrack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { images } from "../../constants";
import { RegularText } from "../../theme/globalFonts";
import TrackList from "../../components/TrackList";
import { RootStackParamList } from "../Library";

type PlaylistDetailsRouteProp = RouteProp<
  RootStackParamList,
  "PlaylistDetails"
>;

const PlaylistDetails = () => {
  const route = useRoute<PlaylistDetailsRouteProp>();
  const { playlist } = route.params;

  return (
    <Container>
      <PlaylistImage source={images.DefaultPlaylistCover} />

      <PlaylistTitle>{playlist.name}</PlaylistTitle>
      <RegularText>{playlist.description}</RegularText>

      <TrackList
        tracks={playlist.songs.map((song: Song) => mapSongToTrack(song))}
      />
    </Container>
  );
};

export default PlaylistDetails;
