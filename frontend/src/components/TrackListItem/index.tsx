import { Image } from "expo-image";
import { Text, TouchableHighlight, View } from "react-native";
import { TrackArtistText, TrackItemContainer, TrackItemImage, TrackTitleText } from "./styles";

interface TrackListItemProps {
  track: {
    title: string;
    image?: string;
    artist?: string;
  };
}

const TrackListItem = ({ track }: TrackListItemProps) => {
  return (
    <TouchableHighlight>
      <TrackItemContainer>
        <View>
          <TrackItemImage
            source={require( "../../assets/default-song-cover.png")}
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
