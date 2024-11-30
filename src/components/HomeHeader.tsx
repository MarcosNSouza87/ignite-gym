import * as GS from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import {LogOut} from 'lucide-react-native'

export function HomeHeader() {
	return (
		<GS.HStack bg="$gray600" gap="$4" pt="$16" pb="$5" px="$8" alignItems="center">
			<UserPhoto
				source={{
					uri: 'https://github.com/MarcosNSouza87.png',
				}}
				alt="imagem do usuario"
				w="$16"
				h="$16"
			/>
			<GS.VStack flex={1}>
				<GS.Text color="$gray100" fontSize="$sm">
					Olá,
				</GS.Text>
				<GS.Heading color="$gray100" fontSize="$md">
					Marcos Nunes
				</GS.Heading>
			</GS.VStack>
			<GS.Icon as={LogOut} color='$gray200' size="xl" />
		</GS.HStack>
	);
}
