import useDeviceInformation from '@/src/hooks/useDeviceInfo';
import {useAppTheme} from '@/src/theme';
import {Box, Text} from '@gluestack-ui/themed';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeviceInfo = () => {
  const {theme} = useAppTheme();

  const {deviceName, osVersion} = useDeviceInformation();
  return (
    <Box
      backgroundColor={theme.colors.border}
      padding={20}
      borderRadius={12}
      width={'100%'}
      marginBottom={24}>
      <Box flexDirection="row" alignItems="center" marginBottom={16} gap={8}>
        <Icon name="information-outline" size={24} color={theme.colors.text} />
        <Text fontSize={18} fontWeight="700" color={theme.colors.text}>
          Informações do Dispositivo
        </Text>
      </Box>

      <Box gap={12}>
        {Platform.OS === 'android' && (
          <Box flexDirection="row" alignItems="center" gap={8}>
            <Icon name="cellphone" size={20} color={theme.colors.text} />
            <Text fontSize={14} color={theme.colors.text}>
              Nome: {deviceName}
            </Text>
          </Box>
        )}

        {osVersion && (
          <Box flexDirection="row" alignItems="center" gap={8}>
            <Icon
              name={Platform.OS === 'ios' ? 'apple' : 'android'}
              size={20}
              color={theme.colors.text}
            />
            <Text fontSize={14} color={theme.colors.text}>
              Versão do Sistema: {Platform.OS === 'ios' ? 'iOS' : 'Android'}{' '}
              {osVersion}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DeviceInfo;
