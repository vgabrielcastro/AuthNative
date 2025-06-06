import {Box, Icon, MoonIcon, Pressable, SunIcon} from '@gluestack-ui/themed';
import {BlurView} from '@react-native-community/blur';
import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {useThemeStore} from '../store/useThemeStore';
import {useAppTheme} from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ThemeToggleButton = () => {
  const {isDark, toggleTheme} = useThemeStore();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const {theme} = useAppTheme();

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    toggleTheme();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const shadowStyle = {
    shadowColor: isDark ? '#000' : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isDark ? 0.4 : 0.15,
    shadowRadius: 6,
    elevation: 6,
  };

  return (
    <Box
      position="absolute"
      bottom={100}
      right={24}
      zIndex={999}
      width={48}
      height={48}
      borderRadius={32}
      overflow="hidden"
      style={shadowStyle}>
      <BlurView />

      <Box
        width="100%"
        height="100%"
        backgroundColor={theme.colors.border}
        borderRadius={32}
        borderWidth={2}
        borderColor={isDark ? theme.colors.border : theme.colors.text}
        justifyContent="center"
        alignItems="center">
        <AnimatedPressable
          onPress={handlePress}
          width="55%"
          justifyContent="center"
          alignItems="center"
          transform={[{rotate: rotation}]}>
          <Icon
            as={isDark ? MoonIcon : SunIcon}
            color={isDark ? theme.colors.white : theme.colors.black}
          />
        </AnimatedPressable>
      </Box>
    </Box>
  );
};

export default ThemeToggleButton;
