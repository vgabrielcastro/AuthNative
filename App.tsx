import {
  Box,
  GluestackUIProvider,
  HStack,
  SafeAreaView,
  ScrollView,
  StyledProvider,
  Text,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, useColorScheme} from 'react-native';
import ThemeToggleButton from './src/components/ThemeToggleButton';
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
        <SafeAreaView flex={1} backgroundColor={theme.colors.background}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
              flex={1}
              backgroundColor={theme.colors.background}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="automatic">
              <Box width={'100%'} padding={24} marginTop={100}>
                <Text
                  fontSize={24}
                  fontWeight={'bold'}
                  marginBottom={4}
                  color={theme.colors.text}>
                  Bem-vindo(a) Auth Native!
                </Text>

                <HStack marginBottom={32}>
                  <Text fontSize={18} color={theme.colors.gray}>
                    Este é um ambiente de demonstração de habilidades e
                    conhecimento em React Native.
                  </Text>
                </HStack>
              </Box>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </GluestackUIProvider>
    </StyledProvider>
  );
}
