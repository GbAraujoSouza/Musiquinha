import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { SemiboldText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-top: 2rem;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const HeaderImage = styled.Image`
  width: 32px;
  height: 32px;
`;
