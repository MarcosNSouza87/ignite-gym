import { StatusBar } from 'react-native';
import {
	useFonts,
	Roboto_700Bold,
	Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { GluestackUIProvider, Text, Center } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';
import { useAuth } from '@hooks/useAuth';

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

	const {user} = useAuth();

	return (
		<GluestackUIProvider config={config}>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor={'transparent'}
			/>
			<AuthContextProvider>
				{fontsLoaded ? <Routes /> : <Loading />}
			</AuthContextProvider>
		</GluestackUIProvider>
	);
}
