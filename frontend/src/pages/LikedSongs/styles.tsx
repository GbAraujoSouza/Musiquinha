import styled from "styled-components/native";
import { RegularText, SemiboldText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 2rem;
`;

export const HeaderContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const SongsCount = styled(SemiboldText)`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.BLUE}
`
