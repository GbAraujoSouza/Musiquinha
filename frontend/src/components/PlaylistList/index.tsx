import { Playlist } from "../../models/playlist";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { PlaylistListItem } from "../PlaylistListItem";
import { ItemDivider } from "../TrackList/styles";

interface PlaylistsListProps {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
}

export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
}: PlaylistsListProps) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      data={playlists}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem
          playlist={playlist}
          onPress={() => handlePlaylistPress(playlist)}
        />
      )}
    />
  );
};
