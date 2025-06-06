import {
  Box,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {Platform} from 'react-native';
import MoreInfo from '../components/MoreInfo';
import ThemeInfo from '../components/ThemeInfo';
import ThemeToggleButton from '../components/ThemeToggleButton';
import {AuthError} from '../services/auth';
import {useAppTheme} from '../theme';
import {useAuth} from '../contexts/AuthContext';

const HomeScreen = () => {
  const {theme} = useAppTheme();
  const {signOut, user} = useAuth();

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      let errorMessage = 'Erro ao fazer logout. Tente novamente mais tarde.';

      if (error instanceof AuthError) {
        errorMessage = error.message;
      }

      console.log('Logout Error', errorMessage);
    }
  };

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
          <Box
            flex={1}
            justifyContent={'flex-start'}
            alignItems={'center'}
            backgroundColor={theme.colors.background}
            padding={24}>
            <Box marginTop={50} marginBottom={32} alignItems={'center'}>
              <Text
                fontSize={32}
                fontWeight={'bold'}
                color={theme.colors.text}
                textAlign={'center'}>
                Olá {user?.name} 😊
              </Text>
              <Text
                fontSize={20}
                fontWeight={'bold'}
                color={theme.colors.text}
                textAlign={'center'}
                marginTop={8}>
                Bem-vindo(a) ao app de teste com React Native!
              </Text>
              <Text
                fontSize={16}
                fontWeight={'bold'}
                color={theme.colors.text}
                textAlign={'center'}
                marginTop={12}
                opacity={0.7}>
                Hoje é {today}
              </Text>
            </Box>

            <MoreInfo />
            <ThemeInfo />

            <Button
              backgroundColor={theme.colors.primary}
              width={100}
              height={48}
              borderRadius={22}
              marginTop={24}
              justifyContent="center"
              onPress={handleLogout}>
              <Text
                color={theme.colors.text}
                fontSize={16}
                fontWeight="bold"
                textAlign="center">
                Sair
              </Text>
            </Button>
          </Box>
        </ScrollView>
        <ThemeToggleButton />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
