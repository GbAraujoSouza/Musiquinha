import { Playlist } from "../../models/playlist";
import { Pressable, View } from "react-native";
import {
  MusicCountText,
  PlaylistItemContainer,
  PlaylistItemImage,
  PlaylistItemTitle,
} from "./styles";
import { images } from "../../constants";

interface PlaylistListItemProps {
  playlist: Playlist;
  onPress: () => void;
}

export const PlaylistListItem = ({ playlist, onPress }: PlaylistListItemProps) => {
  return (
    <Pressable onPress={() => onPress()}>
      <PlaylistItemContainer>
        <View>
          <PlaylistItemImage source={images.DefaultPlaylistCover} />
        </View>

        <View>
          <PlaylistItemTitle>{playlist.name}</PlaylistItemTitle>
          <MusicCountText>{`${playlist.songs.length} songs`}</MusicCountText>
        </View>
      </PlaylistItemContainer>
    </Pressable>
  );
};
