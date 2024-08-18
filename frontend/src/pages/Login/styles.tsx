import styled from "styled-components/native";
import { MediumText, RegularText, SemiboldText } from "../../theme/globalFonts";

export const FormContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 2.5rem;
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 30px;
`;

export const ForgotPasswordText = styled(RegularText)`
  text-align: right;
`;

export const Logo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;

export const LogoText = styled(SemiboldText)`
  font-size: 32px;
`;

export const Title = styled(SemiboldText)`
  font-size: 1.5rem;
`;

export const InputSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const StyledLabel = styled(MediumText)`
  font-size: 1rem;
`

export const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.OVERLAY0,
}))`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 1rem;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.COLORS.SURFACE0};
  color: ${({ theme }) => theme.COLORS.TEXT};
  font-size: 1rem;
  outline-width: 0;
`;

export const SignupText = styled(RegularText)`
  text-align: center;
`;

export const SignupLink = styled(RegularText)`
  color: ${({ theme }) => theme.COLORS.MAUVE};
`;

export const ErrorText = styled(RegularText)`
  color: ${({ theme }) => theme.COLORS.RED};
`;
