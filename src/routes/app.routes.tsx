import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { History } from '@screens/History';
import { Profile } from '@screens/Profile';
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { Platform } from 'react-native';
import { HomeRoutes } from './home.routes';

type AppRoutes = {
	home: undefined;
	exercise: undefined;
	profile: undefined;
	history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	const { tokens } = gluestackUIConfig;
	const iconSize = tokens.space[6];
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: tokens.colors.green500,
				tabBarInactiveTintColor: tokens.colors.gray200,
				tabBarStyle: {
					backgroundColor: tokens.colors.gray600,
					borderTopWidth: 0,
					height: Platform.OS === 'android' ? 'auto' : 86,
					paddingBottom: tokens.space['6'],
					paddingTop: tokens.space['4'],
				},
			}}
		>
			<Screen
				name="home"
				component={HomeRoutes}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg width={iconSize} height={iconSize} fill={color} />
					),
				}}
			/>
			<Screen
				name="history"
				component={History}
				options={{
					tabBarIcon: ({ color }) => (
						<HistorySvg width={iconSize} height={iconSize} fill={color} />
					),
				}}
			/>
			<Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<ProfileSvg width={iconSize} height={iconSize} fill={color} />
					),
				}}
			/>
			{/* <Screen
				name="exercise"
				component={Exercise}
				options={{ 
          tabBarButton:() => null
        }} 
			/> */}
		</Navigator>
	);
}
