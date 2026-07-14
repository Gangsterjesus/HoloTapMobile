

/**
 * HoloTap Engineering Patch – 14 July 2026
 *
 * Summary:
 *   This component previously relied on `useScrollOffset` from
 *   `react-native-reanimated`. That hook is intended for web environments
 *   and internally falls back to DOM-based measurement logic. On native
 *   platforms (Android/iOS), this fallback attempts to access `DOMRect`,
 *   which does not exist, causing a runtime crash before the first render.
 *
 * Resolution:
 *   Replaced `useScrollOffset` with `useScrollViewOffset`, the correct
 *   native-safe hook for tracking ScrollView position in React Native.
 *   This eliminates all DOM dependencies and resolves the crash.
 *
 * Impact:
 *   - Removes DOMRect runtime error on physical devices.
 *   - Ensures parallax header animations run using native drivers.
 *   - No changes to layout, interpolation behaviour, or scroll logic.
 *
 * Author:
 *   HoloTap Engineering
 *
 * Engineer Awareness:
 *   Any future scroll-linked animations must use `useScrollViewOffset`
 *   for native compatibility. Avoid importing web-only APIs or hooks
 *   from Reanimated or React Native Web.
 */






import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';

  // Native-safe scroll ref
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // FIX: useScrollViewOffset instead of useScrollOffset
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}
      >
        {headerImage}
      </Animated.View>

      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
