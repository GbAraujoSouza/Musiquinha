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
import theme from "../../theme";

const Library = () => {
  const navigation = useNavigation().navigate;
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
              navigation("LikedSongs" as never);
            }}
          >
            <FavoriteIcon width={30} height={30} fill={theme.COLORS.BASE}/>
          </OptionPressable>
          <OptionText>Your Liken Songs</OptionText>
        </LibrayOptionContainer>
      </OptionsSection>

      <Divider />
    </Container>
  );
};

export default Library;
