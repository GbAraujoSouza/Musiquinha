import styled from "styled-components/native";
import { RegularText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 2rem;
`;
