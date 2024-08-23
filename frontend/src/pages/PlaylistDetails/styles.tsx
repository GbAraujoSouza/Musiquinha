import styled from "styled-components/native";
import { Image } from "expo-image";
import { RegularText, SemiboldText } from "../../theme/globalFonts";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
`;

export const PlaylistImage = styled(Image)`
  width: 230px;
  height: 230px;
  border-radius: 8px;
  margin: 64px 0 24px 0;
  align-self: center;
`;

export const PlaylistTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const SongsCount = styled(RegularText)`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.BLUE};
`;
