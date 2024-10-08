import styled from "styled-components/native";
import { Image } from "expo-image";
import { MediumText, RegularText } from "../../theme/globalFonts";

interface CheckIsTrackActiveProps {
  $isActiveTrack?: boolean;
}

export const TrackItemImage = styled(Image)<CheckIsTrackActiveProps>`
  border-radius: 8px;
  width: 64px;
  height: 64px;
  opacity: ${({ $isActiveTrack }) => ($isActiveTrack ? 0.6 : 1)};
`;

export const TrackArtistText = styled(MediumText)`
  font-size: 12px;
`;

export const TrackTitleText = styled(RegularText) <CheckIsTrackActiveProps>`
  color: ${({ $isActiveTrack, theme }) => ($isActiveTrack ? theme.COLORS.MAUVE : theme.COLORS.TEXT)};
  font-size: 16px;
`;

export const TrackItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
