import { FlatList } from "react-native";
import TrackListItem from "../TrackListItem";
import { ItemDivider } from "./styles";
import TrackPlayer, { Track } from "react-native-track-player";

interface TrackListProps {
  tracks: Track[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  }

  return (
    <FlatList
      data={tracks}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{ paddingBottom: 128 }}
      renderItem={({ item: track }) => (
        <TrackListItem
          track={track}
          onTrackSelect={handleTrackSelect}
        />
      )}
    />
  );
};

export default TrackList;
