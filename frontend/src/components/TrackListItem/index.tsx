import { TouchableHighlight, View } from "react-native";
import {
  TrackArtistText,
  TrackItemContainer,
  TrackItemImage,
  TrackTitleText,
} from "./styles";
import { Track, useActiveTrack } from "react-native-track-player";
import { images } from "../../constants";

interface TrackListItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

const TrackListItem = ({ track, onTrackSelect }: TrackListItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight onPress={() => onTrackSelect(track)}>
      <TrackItemContainer>
        <View>
          <TrackItemImage
            source={track.artwork ?? images.DefaultSongCover}
            $isActiveTrack={isActiveTrack}
          />
        </View>

        <View>
          <TrackTitleText $isActiveTrack={isActiveTrack} numberOfLines={1}>
            {track.title}
          </TrackTitleText>
          <TrackArtistText numberOfLines={1}>
            {track.artist ?? "Unknown"}
          </TrackArtistText>
        </View>
      </TrackItemContainer>
    </TouchableHighlight>
  );
};

export default TrackListItem;
