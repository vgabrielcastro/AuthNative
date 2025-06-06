import {GluestackUIProvider} from '@gluestack-ui/themed';
import React from 'react';
import {StatusBar} from 'react-native';
import {AppNavigator} from './src/routes/AppNavigator';
import {useThemeStore} from './src/store/useThemeStore';
import {useAppTheme} from './src/theme';

const App = () => {
  const {theme} = useAppTheme();
  const {isDark} = useThemeStore();

  return (
    <GluestackUIProvider config={theme}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </GluestackUIProvider>
  );
};

export default App;
