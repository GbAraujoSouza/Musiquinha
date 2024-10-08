import React, { useEffect, useState } from "react";
import { RegularText, SemiboldText } from "../../theme/globalFonts";
import {
  Container,
  TopSongContainer,
  TopSongImage,
  Section,
  SectionTitle,
} from "./styles";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { FlatList, Pressable } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import SongService from "../../services/SongService";
import mapSongToTrack from "../../helpers/mapSongToTrack";
import { images } from "../../constants";

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
    <Pressable onPress={() => onTrackSelect(track)}>
      <TopSongContainer>
        <TopSongImage source={track.artwork ?? images.DefaultSongCover} />
        <SemiboldText>{track.title}</SemiboldText>
        <RegularText>{track.artist}</RegularText>
      </TopSongContainer>
    </Pressable>
  );
};

const Home = () => {
  const { user, token } = useAuth();

  const [songs, setSongs] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await SongService.getTopSongs(token!);
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

  // if (loading) return <ActivityIndicator />
  // if (error) return <Text>Error: {error}</Text>

  return (
    <Container>
      <Header text={`Hi ${user?.name}`} />

      <Section>
        <SectionTitle>Top Songs</SectionTitle>
        <FlatList
          data={songs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: track }) => (
            <TopSong track={track} onTrackSelect={handleTrackSelect} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Section>
    </Container>
  );
};

export default Home;
