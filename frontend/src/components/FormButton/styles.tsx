import styled from "styled-components/native";

export const LoginButton = styled.Pressable`
  background-color: ${({ theme }) => theme.COLORS.MAUVE};
  border-radius: 5px;
  padding: 15px;
  align-items: center;
`;

export const LoginButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BASE};
  font-weight: bold;
`
