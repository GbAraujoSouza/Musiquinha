import { TouchableHighlight, View } from "react-native";
import { TrackArtistText, TrackItemContainer, TrackItemImage, TrackTitleText } from "./styles";
import { Track } from "react-native-track-player";
import DefaultSongCover from  "../../assets/default-song-cover.png";

interface TrackListItemProps {
  track: Track;
}

const TrackListItem = ({ track }: TrackListItemProps) => {
  return (
    <TouchableHighlight>
      <TrackItemContainer>
        <View>
          <TrackItemImage
            source={track.artwork ?? DefaultSongCover}
          />
        </View>

        <View>
          <TrackTitleText numberOfLines={1}>{track.title}</TrackTitleText>
          <TrackArtistText numberOfLines={1}>
            {track.artist ?? "Unknown"}
          </TrackArtistText>
        </View>
      </TrackItemContainer>
    </TouchableHighlight>
  );
};

export default TrackListItem;
