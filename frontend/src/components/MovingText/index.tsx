import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { AnimatedText, MovingTextContainer } from "./styles";

interface MovingTextProps {
  text: string | undefined;
}

export const MovingText = ({ text }: MovingTextProps) => {
  const translation = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;

  const startAnimation = () => {
    translation.setValue(0);

    Animated.sequence([
      // move left
      Animated.timing(translation, {
        toValue: -150,
        duration: 5000,
        useNativeDriver: true,
      }),
      // move right
      Animated.timing(translation, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <MovingTextContainer>
      <AnimatedText
        numberOfLines={1}
        style={[
          {
            transform: [{ translateX: translation }],
          },
        ]}
      >
        {text}
      </AnimatedText>
    </MovingTextContainer>
  );
};
