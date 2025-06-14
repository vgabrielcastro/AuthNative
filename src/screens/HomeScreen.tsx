import {
  Box,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreInfo from '../components/MoreInfo';
import ThemeInfo from '../components/ThemeInfo';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
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
            <Box width="100%" maxWidth={400} padding={24} marginTop={50}>
              <View alignItems={'center'} gap={16}>
                <Icon
                  name="rocket-launch"
                  size={48}
                  color={theme.colors.primary}
                />
                <Text
                  fontSize={24}
                  fontWeight={'bold'}
                  color={theme.colors.text}
                  textAlign={'center'}>
                  Bem-vindo(a) ao app de teste com React Native!
                </Text>
                <View
                  flexDirection="row"
                  alignItems="center"
                  padding={12}
                  borderRadius={8}
                  backgroundColor={theme.colors.card}
                  borderWidth={1}
                  borderColor={theme.colors.border}>
                  <Icon name="calendar" size={20} color={theme.colors.text} />
                  <Text
                    fontSize={16}
                    fontWeight={'medium'}
                    color={theme.colors.text}
                    opacity={0.8}>
                    {today}
                  </Text>
                </View>
              </View>
            </Box>

            <Box marginTop={32}>
              <MoreInfo />
              <ThemeInfo />
            </Box>
          </Box>
        </ScrollView>
        <ThemeToggleButton />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
