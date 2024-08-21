import { FlatList } from "react-native";
import TrackListItem from "../TrackListItem";
import { ItemDivider } from "./styles";
import { Track } from "react-native-track-player";

interface TrackListProps {
  tracks: Track[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  const handleTrackSelect = (track: Track) => {
    console.log(track)
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
