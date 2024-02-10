import { DrawerToggleButton } from '@react-navigation/drawer';
import { colorTokens, themes } from '@tamagui/themes';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

const Layout = () => {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: theme.color.get(),
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Moviestar',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: '',
          // headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      <Stack.Screen
        name="tv/[id]"
        options={{
          title: '',
          // headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
    </Stack>
  );
};

export default Layout;
