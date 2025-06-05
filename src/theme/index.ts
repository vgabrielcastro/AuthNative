import {useThemeStore} from '../store/useThemeStore';
import {darkTheme} from './dark';
import {lightTheme} from './light';

export function useAppTheme() {
  const {isDark} = useThemeStore();

  return {
    theme: isDark ? darkTheme : lightTheme,
  };
}
