import {
  Box,
  Button,
  Divider,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from '../components/DeviceInfo';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import {useAuth} from '../contexts/AuthContext';
import {AuthError} from '../services/auth';
import {useAppTheme} from '../theme';
import {RootStackParamList} from '../types/navigation';

type ConfigScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export default function ConfigScreen() {
  const {theme} = useAppTheme();
  const {signOut, user} = useAuth();
  const navigation = useNavigation<ConfigScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      let errorMessage = 'Erro ao fazer logout. Tente novamente mais tarde.';

      if (error instanceof AuthError) {
        errorMessage = error.message;
      }

      console.log('Logout Error', errorMessage);
    }
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderConfigItem = (
    icon: string,
    title: string,
    subtitle: string,
    onPress?: () => void,
  ) => (
    <Pressable
      onPress={onPress}
      backgroundColor={theme.colors.card}
      borderRadius={12}
      padding={16}
      marginBottom={12}>
      <HStack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        <Box padding={12} paddingLeft={16} marginRight={22}>
          <Feather name={icon} size={20} color={theme.colors.text} />
        </Box>
        <VStack flex={1}>
          <Text fontSize={16} fontWeight="bold" color={theme.colors.text}>
            {title}
          </Text>
          <Text fontSize={14} color={theme.colors.text} opacity={0.7}>
            {subtitle}
          </Text>
        </VStack>
        {onPress && (
          <Box opacity={0.5} marginLeft={16}>
            <Feather name="chevron-right" size={20} color={theme.colors.text} />
          </Box>
        )}
      </HStack>
    </Pressable>
  );

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <ScrollView flex={1} padding={16} paddingTop={100}>
        <HStack alignItems="center">
          <Box
            backgroundColor={theme.colors.primary}
            width={60}
            height={60}
            borderRadius={30}
            justifyContent="center"
            alignItems="center">
            <Text
              fontSize={24}
              fontWeight="bold"
              color={theme.colors.textButton}>
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </Box>
          <VStack flex={1} marginLeft={16}>
            <Text fontSize={20} fontWeight="bold" color={theme.colors.text}>
              {user?.name || 'Usuário'}
            </Text>
            <Text fontSize={14} color={theme.colors.text} opacity={0.7}>
              {user?.email || 'email@exemplo.com'}
            </Text>
          </VStack>
        </HStack>

        <Divider marginVertical={24} />

        <Text
          fontSize={18}
          fontWeight="bold"
          color={theme.colors.text}
          marginBottom={16}>
          Informações
        </Text>

        <DeviceInfo />

        {renderConfigItem('info', 'Sobre o App', 'Versão 1.0.0')}

        <Divider marginVertical={24} />

        <Text
          fontSize={18}
          fontWeight="bold"
          color={theme.colors.text}
          marginBottom={16}>
          Desenvolvido
        </Text>

        <Button
          backgroundColor={theme.colors.error}
          width="100%"
          height={48}
          borderRadius={12}
          marginTop={24}
          justifyContent="center"
          onPress={showLogoutConfirmation}>
          <HStack display="flex" flexDirection="row" justifyContent="center">
            <Feather name="log-out" size={20} color={theme.colors.textButton} />
            <Text
              color={theme.colors.textButton}
              fontSize={16}
              fontWeight="bold"
              textAlign="center"
              marginLeft={8}>
              Sair
            </Text>
          </HStack>
        </Button>
      </ScrollView>
      <ThemeToggleButton />
    </Box>
  );
}
