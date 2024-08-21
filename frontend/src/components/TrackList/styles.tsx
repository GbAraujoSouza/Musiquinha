import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const ItemDivider = styled.View`
  margin: 9px 0;
  border-color: ${({theme}) => theme.COLORS.TEXT};
  border-width: ${StyleSheet.hairlineWidth};
  opacity: 0.3;
`
