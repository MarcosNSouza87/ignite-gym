import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import * as GS from '@gluestack-ui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { ToastMessage } from '@components/ToastMessage';

export function Profile() {
	const [userPhoto, setUserPhoto] = useState(
		'https://github.com/MarcosNSouza87.png',
	);

	const toast = GS.useToast();

	async function handleUserPhotoSelect() {
		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});
			if (photoSelected.canceled) {
				return;
			}

			const photoUri = photoSelected.assets[0].uri;
			if (photoUri) {
				const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
					size: number;
				};


				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
					return toast.show({
						placement: 'top',
						render: ({ id }) => (
							<ToastMessage
								id={id}
								action="error"
								title="Essa imagem é muito grande. Escolha uma de até 5Mb."
								onClose={() => toast.close(id)}
							/>
						),
					});
				}

				setUserPhoto(photoUri);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<GS.VStack>
			<ScreenHeader title="Perfil" />

			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<GS.Center mt="$6" mb="$20" px="$10">
					<UserPhoto
						source={{
							uri: userPhoto,
						}}
						alt="Foto do usuário"
						size="xl"
					/>
					<TouchableOpacity onPress={handleUserPhotoSelect}>
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
					<GS.Center w="$full" gap="$4" pb="$10">
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
