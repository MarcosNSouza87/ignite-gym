import { StatusBar, View } from 'react-native';
import {
	useFonts,
	Roboto_700Bold,
	Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { GluestackUIProvider, Text, Center } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

	return (
		<GluestackUIProvider config={config}>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor={'transparent'}
			/>
			{fontsLoaded ? (
				<Center flex={1} bg="$gray700">
					<Text color="white" fontSize={34}>
						Home
					</Text>
				</Center>
			) : (
				<View />
			)}
		</GluestackUIProvider>
	);
}
