import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
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

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  return (
    <StyledPressable>
      <TrackInfoContainer>
        <Image
          source={displayTrack.artwork ?? DefaultSongCover}
          style={{ width: 40, height: 40, borderRadius: 8 }}
        />

        <TrackInfo>
          <TrackTitle>{displayTrack.title}</TrackTitle>
          <TrackArtist>{displayTrack.artist ?? "Unknown"}</TrackArtist>
        </TrackInfo>
      </TrackInfoContainer>

      <TrackControlsContainer>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </TrackControlsContainer>
    </StyledPressable>
  );
};

export default FloatingPlayer;
