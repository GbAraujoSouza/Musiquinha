import styled from "styled-components/native";
import { RegularText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 2rem;
`;

export const OptionsSection = styled.View`
  display: flex;
  gap: 1.5rem;
  padding: 2rem 0;
`;

export const LibrayOptionContainer = styled.View`
  display: flex;
  gap: 1.7rem;
  align-items: center;
  flex-direction: row;
`;

export const OptionText = styled(RegularText)`
  font-size: 20px;
`;

export const OptionPressable = styled.Pressable`
  width: 3.5rem;
  height: 3.5rem;
  padding: 1rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS.MAUVE};
`;

export const Divider = styled.View`
  height: 2px;
  width: 70%;
  background-color: ${({ theme }) => theme.COLORS.TEXT};
  align-self: center;
  margin: 0.5rem;
`;
