import { Image } from "expo-image";
import { Pressable } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import DefaultSongCover from "../../assets/default-song-cover.png";
import {
  StyledPressable,
  TrackArtist,
  TrackControlsContainer,
  TrackInfo,
  TrackInfoContainer,
  TrackTitle,
} from "./styles";
import { PlayPauseButton, SkipToNextButton } from "../PlayerControls";
import { useLastActiveTrack } from "../../hooks/useLastActiveTrack";
import { FontAwesome } from "@expo/vector-icons";
import { useFavorites } from "../../contexts/FavoritesContext";
import theme from "../../theme";

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const { isFavorite, toggleFavorite } = useFavorites();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  return (
    <StyledPressable>
      <TrackInfoContainer>
        <Image
          source={displayTrack.artwork ?? DefaultSongCover}
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
            style={{paddingLeft: 16}}
          />
        </Pressable>
      </TrackInfoContainer>

      <TrackControlsContainer>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </TrackControlsContainer>
    </StyledPressable>
  );
};

export default FloatingPlayer;
