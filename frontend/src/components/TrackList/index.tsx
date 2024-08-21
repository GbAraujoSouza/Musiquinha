import { FlatList } from "react-native";
import TrackListItem from "../TrackListItem";
import { ItemDivider } from "./styles";
import { Track } from "react-native-track-player";

interface CustomTrack extends Track {
  abuleibe?: string;
}

interface TrackListProps {
  tracks: CustomTrack[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <FlatList
      data={tracks}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{ paddingBottom: 128 }}
      renderItem={({ item: track }) => (
        <TrackListItem
          track={track}
        />
      )}
    />
  );
};

export default TrackList;
