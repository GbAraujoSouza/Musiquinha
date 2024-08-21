import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
import DefaultSongCover from "../../assets/default-song-cover.png";
import { StyledPressable, TrackControlsContainer, TrackInfo, TrackTitle } from "./styles";
import { PlayPauseButton, SkipToNextButton } from "../PlayerControls";

const FloatingPlayer = () => {
  const activeTrack = useActiveTrack();

  const displayTrack: Track = activeTrack ?? {
    title: "example song",
    url: "",
  };

  if (!displayTrack) return null;

  return (
    <StyledPressable>
      <TrackInfo>
        <Image source={displayTrack.artwork ?? DefaultSongCover} />

        <View>
          <TrackTitle>{displayTrack.title}</TrackTitle>
        </View>
      </TrackInfo>

      <TrackControlsContainer>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </TrackControlsContainer>
    </StyledPressable>
  );
};

export default FloatingPlayer;
