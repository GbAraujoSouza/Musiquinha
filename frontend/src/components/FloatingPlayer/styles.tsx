import styled from "styled-components/native";
import { SemiboldText } from "../../theme/globalFonts";

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
  bottom: 0px;
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
