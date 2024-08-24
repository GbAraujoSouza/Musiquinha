import styled from "styled-components/native";
import { BoldText, RegularText, SemiboldText } from "../../theme/globalFonts";
import { Image } from "expo-image";

export const TrackTitle = styled(SemiboldText)`
  font-size: 18px;
  padding-left: 10px;
`;

export const TrackArtist = styled(SemiboldText)`
  font-size: 14px;
  padding-left: 10px;
  opacity: 0.8;
`;

export const TrackTitleContainer = styled.View`
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
`;

export const TrackControlsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-right: 16px;
  padding-left: 16px;
`;

export const StyledPressable = styled.Pressable`
  display: flex;
  flex: 1;
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.SURFACE0};
  padding: 10px 8px;

  position: absolute;
  left: 0px;
  bottom: 60px;
`;

export const TrackInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TrackInfo = styled.View`
  display: flex;
  flex-direction: column;
`;

export const PlaylistName = styled(RegularText)`
  color: ${({ theme }) => theme.COLORS.BASE};
`;

export const PlaylistImage = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`;

export const AddToPlaylistTitleContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const AddToPlaylistTitle = styled(BoldText)`
  color: ${({ theme }) => theme.COLORS.BASE};
  font-size: 22px;
`;

export const SelectPlaylistPressable = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const PlaylistModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const PlaylistModalContent = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BLUE};
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
