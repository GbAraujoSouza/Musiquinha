import React, { useState, useEffect } from "react";
import { Track } from "react-native-track-player";
import SongService from "../../services/SongService";
import { useAuth } from "../../contexts/AuthContext";
import mapSongToTrack from "../../helpers/mapSongToTrack";
import Header from "../../components/Header";
import { StyledTextInput } from "../Login/styles";
import { Container, NoResultsImage, SearchPageContent } from "./styles";
import TrackList from "../../components/TrackList";
import { RegularText } from "../../theme/globalFonts";
import EmptySearchImage from "../../assets/empty-search.png";
import { Image } from "expo-image";

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const fetchSongs = async (query: string) => {
    setLoading(true);
    try {
      const response = await SongService.searchSongs(token!, query);
      const mappedSongs = response?.data.data.map((song: Song) =>
        mapSongToTrack(song),
      );
      setSongs(mappedSongs || []);
    } catch (error) {
      console.error("Error fetching songs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSongs(searchTerm);
    } else {
      setSongs([]);
    }
  }, [searchTerm]);

  return (
    <Container>
      <Header text="Search for song" />
      <SearchPageContent>
        <StyledTextInput
          placeholder="Search for songs..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {loading ? (
          <RegularText>Loading...</RegularText>
        ) : songs.length === 0 ? (
          <NoResultsImage source={EmptySearchImage}/>
        ) : (
          <TrackList tracks={songs} />
        )}
      </SearchPageContent>
    </Container>
  );
};

export default SearchScreen;
