import styled from "styled-components/native";
import { RegularText } from "../../theme/globalFonts";

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BASE};
  padding: 0 32px;
`;

export const OptionsSection = styled.View`
  display: flex;
  gap: 1.5rem;
  padding: 32px 0;
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
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS.MAUVE};
`;

export const Divider = styled.View`
  height: 2px;
  width: 70%;
  background-color: ${({ theme }) => theme.COLORS.TEXT};
  align-self: center;
  margin: 8px;
`;
