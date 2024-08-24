import styled from "styled-components/native";
import { SemiboldText } from "../../theme/globalFonts";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding: 16px 0 32px 0;
`;

export const HeaderTitle = styled(SemiboldText)`
  font-size: 22px;
`;

export const SongsCount = styled(SemiboldText)`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.BLUE}
`
