import styled from "styled-components/native";
import { RegularText, SemiboldText } from "../../theme/globalFonts";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const SongsCount = styled(SemiboldText)`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.BLUE}
`
