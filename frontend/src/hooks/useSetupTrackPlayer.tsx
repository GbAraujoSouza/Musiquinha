import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 20, // 20MB
  });

  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    setupPlayer().then(() => {
      isInitialized.current = true;
      onLoad?.()
    })
    .catch((error) => {
        isInitialized.current = false;
        // TODO show a toast
        console.log(error);
      });
  }, [onLoad]);
};
