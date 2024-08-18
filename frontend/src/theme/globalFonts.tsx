import styled from 'styled-components/native';

export const DefaultText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.POPPINS.REGULAR};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const RegularText = styled(DefaultText)``;

export const MediumText = styled(DefaultText)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.POPPINS.MEDIUM};
`;

export const SemiboldText = styled(DefaultText)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.POPPINS.SEMIBOLD};
`;

export const BoldText = styled(DefaultText)`
  font-family: ${({ theme }) => theme.FONT_FAMILY.POPPINS.BOLD};
`;

