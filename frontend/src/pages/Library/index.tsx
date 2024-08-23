import Header from "../../components/Header";
import {
  Container,
  Divider,
  LibrayOptionContainer,
  OptionPressable,
  OptionsSection,
  OptionText,
} from "./styles";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import FavoriteIcon from "../../assets/icons/favorite-icon.svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme from "../../theme";
import { PlaylistsList } from "../../components/PlaylistList";
import { usePlaylists } from "../../contexts/PlaylistContext";
import { Playlist } from "../../models/playlist";

export type RootStackParamList = {
  PlaylistDetails: { playlist: Playlist };
  LikedSongs: undefined;
};

const Library = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {playlists} = usePlaylists();

  const handlePlaylistPress = (playlist: Playlist) => {
    console.log("playlist: ", playlist)
    navigation.navigate("PlaylistDetails", { playlist })
  }

  return (
    <Container>
      <Header text="My Library" />
      <OptionsSection>
        <LibrayOptionContainer>
          <OptionPressable>
            <PlusIcon width={30} height={30} fill={theme.COLORS.BASE}/>
          </OptionPressable>
          <OptionText>Add New Playlist</OptionText>
        </LibrayOptionContainer>

        <LibrayOptionContainer>
          <OptionPressable
            onPress={() => {
              navigation.navigate("LikedSongs" as never);
            }}
          >
            <FavoriteIcon width={30} height={30} fill={theme.COLORS.BASE}/>
          </OptionPressable>
          <OptionText>Your Liken Songs</OptionText>
        </LibrayOptionContainer>
      </OptionsSection>

      <Divider />

      <PlaylistsList playlists={playlists} onPlaylistPress={handlePlaylistPress}/>
    </Container>
  );
};

export default Library;
