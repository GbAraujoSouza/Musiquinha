import { Animated } from "react-native";
import styled from "styled-components/native";

export const MovingTextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const AnimatedText = styled(Animated.Text)`
  width: 999px;
  font-size: 18px;
  padding-left: 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.POPPINS.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
