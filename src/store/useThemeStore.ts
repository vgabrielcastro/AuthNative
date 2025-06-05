import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDark: true,
      toggleTheme: () =>
        set(state => ({
          isDark: !state.isDark,
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
