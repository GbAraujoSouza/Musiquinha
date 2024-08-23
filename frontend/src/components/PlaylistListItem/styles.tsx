import styled from "styled-components/native";
import { Image } from "expo-image";
import { RegularText } from "../../theme/globalFonts";

export const PlaylistItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 0.8px;
  align-items: center;
`;

export const PlaylistItemImage = styled(Image)`
  border-radius: 8px;
  width: 84px;
  height: 84px;
`;

export const PlaylistItemTitle = styled(RegularText)`
  font-size: 20px;
`;

export const MusicCountText = styled(RegularText)`
  font-size: 16px;
  color: ${({theme}) => theme.COLORS.SURFACE1}
`
