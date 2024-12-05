import * as GS from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@hooks/useAuth';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { TouchableOpacity } from 'react-native';

export function HomeHeader() {

	const { user,signOut } = useAuth();

	return (
		<GS.HStack bg="$gray600" gap="$3" pt="$16" pb="$5" px="$8" alignItems="center">
			<UserPhoto
				source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
				alt="imagem do usuario"
				w="$16"
				h="$16"
			/>
			<GS.VStack flex={1}>
				<GS.Text color="$gray100" fontSize="$md" mb='-$1.5'>
					Olá,
				</GS.Text>
				<GS.Heading color="$gray100" fontSize="$md">
					{user.name}
				</GS.Heading>
			</GS.VStack>
			<TouchableOpacity onPress={signOut}>
				<GS.Icon as={LogOut} color="$gray200" size="xl" />
			</TouchableOpacity>
		</GS.HStack>
	);
}
