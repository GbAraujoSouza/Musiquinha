import { Animated, Pressable, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { FontAwesome6 } from "@expo/vector-icons";
import theme from "../../theme";

interface PlayerButtonProps {
  style?: ViewStyle;
  iconSize?: number;
}

const animated = new Animated.Value(1);

const fadeIn = () => {
  Animated.timing(animated, {
    toValue: 0.1,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

const fadeOut = () => {
  Animated.timing(animated, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
  const { playing } = useIsPlaying();

  return (
    <View style={[{ height: iconSize }, style]}>
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={theme.COLORS.TEXT}
        />
      </Pressable>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6 name="forward" size={iconSize} color={theme.COLORS.TEXT} />
    </Pressable>
  );
};
