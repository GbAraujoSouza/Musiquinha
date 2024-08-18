import styled from "styled-components/native";
import { BoldText } from "../../theme/globalFonts";

export const LoginButton = styled.Pressable`
  background-color: ${({ theme }) => theme.COLORS.MAUVE};
  border-radius: 5px;
  padding: 15px;
  align-items: center;
`;

export const LoginButtonText = styled(BoldText)`
  color: ${({ theme }) => theme.COLORS.BASE};
`
