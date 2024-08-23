import { Image } from "expo-image";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
  height: 100%;
  gap: 16px;
`;

export const SearchPageContent = styled.View`
  gap: 16px;
`;

export const NoResultsImage = styled(Image)`
  width: 146px;
  height: 140px;
  align-self: center;
`;
