import React, { useEffect, useState } from "react";
import { RegularText, SemiboldText } from "../../theme/globalFonts";
import {
  Container,
  TopSongsContainer,
  TopSongContainer,
  TopSongImage,
} from "./styles";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import TrackList from "../../components/TrackList";
import library from "../../assets/data/library.json";
import DefaultImage from "../../assets/default-song-cover.png";
import { Text, ActivityIndicator, FlatList, TouchableHighlight } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import useFetch from "../../hooks/useFetch";
import SongService from "../../services/SongService";

interface TopSongProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

const handleTrackSelect = async (track: Track) => {
  await TrackPlayer.load(track);
  await TrackPlayer.play();
};

const TopSong = ({ track, onTrackSelect }: TopSongProps) => {
  return (
    <TouchableHighlight onPress={() => onTrackSelect(track)}>
      <TopSongContainer>
        <TopSongImage source={track.artwork ?? DefaultImage} />
        <SemiboldText>{track.title}</SemiboldText>
        <RegularText>{track.artist}</RegularText>
      </TopSongContainer>
    </TouchableHighlight>
  );
};

const Home = () => {
  const { user, token } = useAuth();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await SongService.getTopSongs(token!);
        setSongs(response?.data)
        console.log(response?.data)
      } catch (error) {
        console.log(token) 
      }
    }

    fetchTopSongs();
  },[])

  // if (loading) return <ActivityIndicator />
  // if (error) return <Text>Error: {error}</Text>

  return (

    <Container>
      <Header text={`Hi ${user?.name}`} />

        <FlatList
          data={songs}
          horizontal
          
          renderItem={({ item: track }) => (
            <TopSong
              track={track}
              onTrackSelect={handleTrackSelect}
            />
          )}
        />
    </Container>
  );
};

export default Home;
