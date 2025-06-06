import {useThemeStore} from '@/src/store/useThemeStore';
import {useAppTheme} from '@/src/theme';
import {Box, Text} from '@gluestack-ui/themed';

const ThemeInfo = () => {
  const {theme} = useAppTheme();
  const {isDark} = useThemeStore();
  return (
    <Box
      backgroundColor={theme.colors.border}
      padding={20}
      borderRadius={12}
      width={'100%'}
      marginBottom={24}>
      <Text fontSize={16} color={theme.colors.text} marginBottom={6}>
        Thema atual:{' '}
        <Text fontWeight={'bold'}>{isDark ? 'Escuro 🌙' : 'Claro ☀️'}</Text>
      </Text>
      <Text color={theme.colors.text}>
        Você pode alternar o tema usando o botão abaixo.
      </Text>
    </Box>
  );
};

export default ThemeInfo;
