import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import * as GS from '@gluestack-ui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';

export function Profile() {
	return (
		<GS.VStack>
			<ScreenHeader title="Perfil" />
			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<GS.Center mt="$6" mb='$20' px="$10">
					<UserPhoto
						source={{
							uri: 'https://github.com/MarcosNSouza87.png',
						}}
						alt="Foto do usuário"
						size="xl"
					/>
					<TouchableOpacity>
						<GS.Text
							color="$green500"
							fontFamily="$heading"
							fontSize="$md"
							mt="$2"
							mb="$8"
						>
							Alterar Foto
						</GS.Text>
					</TouchableOpacity>

					<GS.Center w="$full" gap="$4">
						<Input placeholder="Nome" bg="$gray600" />
						<Input value="niphire@gmail.com" bg="$gray600" isReadOnly />
					</GS.Center>

					<GS.Heading
						alignSelf="flex-start"
						fontFamily="$heading"
						color="$gray200"
						fontSize="$md"
						mt="$12"
						mb="$2"
					>
						Alterar senha
					</GS.Heading>
					<GS.Center w="$full" gap="$4" pb='$10'>
						<Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
						<Input placeholder="Nova Senha" bg="$gray600" secureTextEntry />
						<Input
							placeholder="Confirmar Nova Senha"
							bg="$gray600"
							secureTextEntry
						/>
						<Button title="Atualizar" />
					</GS.Center>
				</GS.Center>
			</ScrollView>
		</GS.VStack>
	);
}
