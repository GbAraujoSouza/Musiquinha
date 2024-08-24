import React, { useEffect, useState } from "react";
import { Container, HeaderContainer, HeaderTitle, SongsCount } from "./styles";
import TrackList from "../../components/TrackList";
import { useAuth } from "../../contexts/AuthContext";
import { Track } from "react-native-track-player";
import SongService from "../../services/SongService";
import mapSongToTrack from "../../helpers/mapSongToTrack";

const LikedSongs = () => {
  const { token } = useAuth();

  const [songs, setSongs] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await SongService.getFavorites(token!);
        const mappedSongs = response?.data.data.map((song: Song) =>
          mapSongToTrack(song),
        );
        setSongs(mappedSongs || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopSongs();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Liked Songs</HeaderTitle>
        <SongsCount>xx musics</SongsCount>
      </HeaderContainer>

      <TrackList tracks={songs} />
    </Container>
  );
};

export default LikedSongs;
