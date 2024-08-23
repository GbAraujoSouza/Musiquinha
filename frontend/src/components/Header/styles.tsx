import styled from "styled-components/native";
import { SemiboldText } from "../../theme/globalFonts";
import { Image } from "expo-image";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: 32px;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const HeaderInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const HeaderImage = styled(Image)`
  width: 32px;
  height: 32px;
`;
