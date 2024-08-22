import styled from "styled-components/native";
import { SemiboldText } from "../../theme/globalFonts";
import { Image } from "expo-image";

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-top: 32px;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const HeaderImage = styled(Image)`
  width: 32px;
  height: 32px;
`;
