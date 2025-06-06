import {GluestackUIProvider, StyledProvider} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import {useThemeStore} from './src/store/useThemeStore';
import {useAppTheme} from './src/theme';

export default function App() {
  const {isDark, toggleTheme} = useThemeStore();
  const systemColorScheme = useColorScheme();
  const {theme} = useAppTheme();
  useEffect(() => {
    if (systemColorScheme) {
      toggleTheme();
    }
  }, [systemColorScheme, toggleTheme]);

  return (
    <StyledProvider config={theme} colorMode={isDark ? 'dark' : 'light'}>
      <GluestackUIProvider config={theme} colorMode={isDark ? 'dark' : 'light'}>
        <LoginScreen />
      </GluestackUIProvider>
    </StyledProvider>
  );
}
