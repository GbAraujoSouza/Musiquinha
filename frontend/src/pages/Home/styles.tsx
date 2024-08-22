import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
`;

export const TopSongsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const TopSongContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TopSongImage = styled(Image)`
  width: 154px;
  height: 154px;
`
