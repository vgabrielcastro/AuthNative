import {
  Box,
  GluestackUIProvider,
  HStack,
  SafeAreaView,
  ScrollView,
  StyledProvider,
  Text,
} from '@gluestack-ui/themed';
import {zodResolver} from '@hookform/resolvers/zod/dist/zod.js';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, useColorScheme} from 'react-native';
import LoginForm from './src/components/LoginForm';
import {LoginFormData} from './src/components/LoginForm/form.interface';
import {loginSchema} from './src/components/LoginForm/schema';
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

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: zodResolver(loginSchema)});

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Form submitted', data);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submission complete');
    }, 2000);
    setIsLoading(false);
  };

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
                <LoginForm
                  control={control}
                  errors={errors}
                  isLoading={isLoading}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </Box>
            </ScrollView>
          </KeyboardAvoidingView>
          <ThemeToggleButton />
        </SafeAreaView>
      </GluestackUIProvider>
    </StyledProvider>
  );
}
