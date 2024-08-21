import { FlatList } from "react-native";
import library from "../../assets/data/library.json";
import TrackListItem from "../TrackListItem";
import { ItemDivider } from "./styles";


const TrackList = () => {
  return (
    <FlatList
      data={library}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{paddingBottom: 128}}
      renderItem={({ item: track }) => (
        <TrackListItem
          track={{
            title: track.title,
            artist: track.artist,
            image: track.artwork,
          }}
        />
      )}
    />
  );
};

export default TrackList;
