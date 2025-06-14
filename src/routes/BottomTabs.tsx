import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {ROUTES, TAB_ICONS} from '../constants/routes';
import ConfigScreen from '../screens/ConfigScreen';
import HomeScreen from '../screens/HomeScreen';
import {useThemeStore} from '../store/useThemeStore';
import {useAppTheme} from '../theme';

const Tab = createBottomTabNavigator();

const getTabBarIcon =
  (routeName: string) =>
  ({color}: {color: string}) => {
    const iconName = TAB_ICONS[routeName as keyof typeof TAB_ICONS];
    return <Feather name={iconName} size={20} color={color} />;
  };

export default function BottomTabs() {
  const {isDark} = useThemeStore();
  const {theme} = useAppTheme();

  const tabBarStyle = {
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 4,
    paddingTop: 4,
  };

  const tabBarLabelStyle = {
    fontSize: 11,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: getTabBarIcon(route.name),
        tabBarStyle,
        tabBarLabelStyle,
        tabBarActiveTintColor: theme.colors.primary || '#4F46E5',
        tabBarInactiveTintColor: isDark ? '#999' : '#666',
        tabBarItemStyle: {
          backgroundColor: 'transparent',
        },
        tabBarPressColor: 'transparent',
        tabBarPressEffect: false,
      })}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.CONFIG} component={ConfigScreen} />
    </Tab.Navigator>
  );
}
