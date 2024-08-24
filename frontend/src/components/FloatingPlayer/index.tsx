import {
  AddToPlaylistTitle,
  AddToPlaylistTitleContainer,
  PlaylistImage,
  PlaylistModalContainer,
  PlaylistModalContent,
  PlaylistName,
  SelectPlaylistPressable,
  StyledPressable,
  TrackArtist,
  TrackControlsContainer,
  TrackInfo,
  TrackInfoContainer,
  TrackTitle,
} from "./styles";
import { Image } from "expo-image";
import { FlatList, Modal, Pressable } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { PlayPauseButton, SkipToNextButton } from "../PlayerControls";
import { useLastActiveTrack } from "../../hooks/useLastActiveTrack";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import theme from "../../theme";
import { usePlaylists } from "../../contexts/PlaylistContext";
import { useState } from "react";
import PlaylistService from "../../services/PlaylistService";
import { useAuth } from "../../contexts/AuthContext";
import { images } from "../../constants";
import { ItemDivider } from "../TrackList/styles";

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const { isFavorite, toggleFavorite } = useFavorites();
  const { token } = useAuth();

  const displayTrack = activeTrack ?? lastActiveTrack;

  const { playlists } = usePlaylists();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addSongToPlaylist = async (playlistId: string) => {
    try {
      await PlaylistService.addSongToPlaylist(
        playlistId,
        displayTrack?.id,
        token!,
      );
      setModalVisible(false);
      // set Toast
    } catch (error) {
      console.log(error);
    }
  };

  if (!displayTrack) return null;

  return (
    <StyledPressable>
      <TrackInfoContainer>
        <Image
          source={displayTrack.artwork ?? images.DefaultSongCover}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />

        <TrackInfo>
          <TrackTitle>{displayTrack.title}</TrackTitle>
          <TrackArtist>{displayTrack.artist ?? "Unknown"}</TrackArtist>
        </TrackInfo>

        <Pressable onPress={() => toggleFavorite(displayTrack.id)}>
          <FontAwesome
            name={isFavorite(displayTrack.id) ? "heart" : "heart-o"}
            size={24}
            color={theme.COLORS.RED}
            style={{ paddingLeft: 16 }}
          />
        </Pressable>
      </TrackInfoContainer>

      <TrackControlsContainer>
        <Pressable onPress={() => setModalVisible(true)}>
          <MaterialIcons
            name="playlist-add"
            size={30}
            color={theme.COLORS.TEXT}
          />
        </Pressable>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </TrackControlsContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <PlaylistModalContainer style={{ flex: 1, justifyContent: "flex-end" }}>
          <PlaylistModalContent>
            <AddToPlaylistTitleContainer>
              <AddToPlaylistTitle>Add to Playlist</AddToPlaylistTitle>
              <Pressable onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={32} color={theme.COLORS.RED} />
              </Pressable>
            </AddToPlaylistTitleContainer>
            <FlatList
              data={playlists}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemDivider}
              renderItem={({ item: track }) => (
                <SelectPlaylistPressable
                  onPress={() => addSongToPlaylist(track.id)}
                >
                  <PlaylistImage source={images.DefaultPlaylistCover} />
                  <PlaylistName>{track.name}</PlaylistName>
                </SelectPlaylistPressable>
              )}
            />
          </PlaylistModalContent>
        </PlaylistModalContainer>
      </Modal>
    </StyledPressable>
  );
};

export default FloatingPlayer;
