import {
  Box,
  HStack,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Platform} from 'react-native';
import LoginForm from '../components/LoginForm';
import {LoginFormData} from '../components/LoginForm/form.interface';
import {loginSchema} from '../components/LoginForm/schema';
import ThemeToggleButton from '../components/ThemeToggleButton';
import {useAppTheme} from '../theme';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const {theme} = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: zodResolver(loginSchema)});

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);

    if (data.email === 'teste@gmail.com' && data.password === '12345') {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <HomeScreen />;
  }

  return (
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
                Este é um ambiente de demonstração de habilidades e conhecimento
                em React Native.
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
  );
};

export default LoginScreen;
