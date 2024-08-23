import styled from "styled-components/native";
import { Image } from "expo-image";
import { BoldText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
`;


export const TopSongContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

export const TopSongImage = styled(Image)`
  width: 154px;
  height: 154px;
`;

export const Section = styled.View`
  padding: 16px 0;
`;

export const SectionTitle = styled(BoldText)`
  font-size: 24px;
`;
