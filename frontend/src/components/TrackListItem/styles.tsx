import styled from "styled-components/native";
import { Image } from "expo-image";
import { MediumText, RegularText } from "../../theme/globalFonts";

export const TrackItemImage = styled(Image)`
  border-radius: 8px;
  width: 64px;
  height: 64px;
`;

export const TrackTitleText = styled(MediumText)`
  font-size: 1rem;
`;

export const TrackArtistText = styled(RegularText)`
  font-size: 0.75rem;
`;

export const TrackItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
