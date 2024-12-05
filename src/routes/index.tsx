import { Box } from '@gluestack-ui/themed';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
//import { AuthContext } from '@contexts/AuthContext';
//import { useContext } from 'react';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
	const theme = DefaultTheme;

	theme.colors.background = gluestackUIConfig.tokens.colors.gray700;

	//const contextData = useContext(AuthContext);

	const { user,isLoadingUserStorageData } = useAuth();

	if(isLoadingUserStorageData){
		return <Loading />
	}

	return (
		<Box flex={1} bg="$gray700">
			<NavigationContainer>
				{user.id ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</Box>
	);
}
