import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/Home';
import { Exercise } from '@screens/Exercise';

type HomeRoutes = {
	homeStack: undefined;
	exercise: {exerciseId: string};
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function HomeRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="homeStack" component={HomeScreen} />
			<Screen name="exercise" component={Exercise} />
		</Navigator>
	);
}
