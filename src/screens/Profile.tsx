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
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

type FormDataProps = {
	name?: string;
	email?: string;
	old_password?: string;
	password?: string | null;
	confirm_password?: string | null;
};

const profileSchema = yup.object({
	name: yup.string(),
	password: yup
		.string()
		.min(6, 'A senha deve conter mais de 6 dígitos.')
		.nullable()
		.transform((value) => (!!value ? value : null)),
	confirm_password: yup
		.string()
		.nullable()
		.transform((value) => (!!value ? value : null))
		.oneOf([yup.ref('password'), ''], 'A confirmação de senha não confere')
		.when('password', {
			is: (Field: any) => Field,
			then: (schema) =>
				schema
					.nullable()
					.required('Informe a confirmação da senha.')
					.transform((value) => (!!value ? value : null)),
		}),
});

export function Profile() {
	const { user, updateUserProfile } = useAuth();
	const [isUpdating, setIsUpdating] = useState(false);

	const [userPhoto, setUserPhoto] = useState(user.avatar);

	const toast = GS.useToast();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
		resolver: yupResolver(profileSchema),
	});

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
				const fileExtension = photoSelected.assets[0].uri.split('.').pop();
				const photoFile = {
					name: `${user.name}.${fileExtension}`.toLowerCase(),
					uri: photoSelected.assets[0].uri,
					type: `${photoSelected.assets[0].type}/${fileExtension}`,
				} as any;

				const userPhotoUploadForm = new FormData();

				userPhotoUploadForm.append('avatar', photoFile);

				const avatarUpdatedResponse = await api.patch(
					'/users/avatar',
					userPhotoUploadForm,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				);

				const userUpdated = user;
				userUpdated.avatar = avatarUpdatedResponse.data.avatar;
				updateUserProfile(userUpdated);

				toast.show({
					placement: 'top',
					render: ({ id }) => (
						<ToastMessage
							id={id}
							action="success"
							title="Foto Atualizada!"
							onClose={() => toast.close(id)}
						/>
					),
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleProfileUpdate(data: FormDataProps) {
		try {
			setIsUpdating(true);
			// console.log('send data => ', data)
			await api.put('/users', data);
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="success"
						title="Perfil Atualizado com sucesso"
						onClose={() => toast.close(id)}
					/>
				),
			});
			const updateUser = user;
			updateUser.name = data.name ?? user.name;
			updateUserProfile(updateUser);
		} catch (error) {
			const isAppError = error instanceof AppError;
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title={
							isAppError ? error.message : 'Não foi possivel atualizar os dados.'
						}
						onClose={() => toast.close(id)}
					/>
				),
			});
		} finally {
			setIsUpdating(false);
		}
	}

	return (
		<GS.VStack>
			<ScreenHeader title="Perfil" />
			{isUpdating ? (
				<GS.VStack mt="$20" alignItems="center" justifyContent="center">
					<Loading />
				</GS.VStack>
			) : (
				<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
					<GS.Center mt="$6" mb="$20" px="$10">
						<UserPhoto
							source={
								user.avatar
									? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
									: defaultUserPhotoImg
							}
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
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Nome"
										bg="$gray600"
										onChangeText={onChange}
										value={value}
										errorMessage={errors.name?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="E-mail"
										keyboardType="email-address"
										bg="$gray600"
										autoCapitalize="none"
										onChangeText={onChange}
										value={value}
										isReadOnly
									/>
								)}
							/>
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
							<Controller
								control={control}
								name="old_password"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Senha antiga"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value}
									/>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Senha"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value === null ? undefined : value}
										errorMessage={errors.password?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name="confirm_password"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Confirmar senha"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value === null ? undefined : value}
										errorMessage={errors.confirm_password?.message}
									/>
								)}
							/>
							<Button
								title="Atualizar"
								onPress={handleSubmit(handleProfileUpdate)}
								isLoading={isUpdating}
							/>
						</GS.Center>
					</GS.Center>
				</ScrollView>
			)}
		</GS.VStack>
	);
}
