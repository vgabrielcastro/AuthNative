import {
  Box,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {Platform} from 'react-native';
import MoreInfo from '../components/MoreInfo';
import ThemeToggleButton from '../components/ThemeToggleButton';
import {useAppTheme} from '../theme';

const HomeScreen = () => {
  const {theme} = useAppTheme();

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
                Olá usuario teste 😊
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
          </Box>
        </ScrollView>
        <ThemeToggleButton />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
