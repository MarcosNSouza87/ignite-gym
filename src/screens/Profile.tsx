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

type FormDataProps = {
	name: string;
	email?: string;
};

type PasswordDataProps = {
	password_old: string;
	password: string;
	password_confirm: string;
};

const UserUpdateSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	email: yup.string().email('E-mail inválido.'),
});

const PasswordUpdateSchema = yup.object({
	password_old: yup.string().required('Informe a senha.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 digítos.'),
	password_confirm: yup
		.string()
		.required('Confirme a senha.')
		.oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere.'),
});

export function Profile() {
	const { user, updateUserProfile } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const [initialName, setInitialName] = useState(user.name);
	const [userPhoto, setUserPhoto] = useState(
		'https://github.com/MarcosNSouza87.png',
	);

	const toast = GS.useToast();

	const userFormData = useForm<FormDataProps>({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
		resolver: yupResolver(UserUpdateSchema),
	});

	const passwordFormData = useForm<PasswordDataProps>({
		resolver: yupResolver(PasswordUpdateSchema),
	});

	async function handleProfileUpdate(data: FormDataProps) {
		let title = '';
		let action: 'success' | 'error' | undefined = 'success';
		try {
			setIsLoading(true);
			await api.put('/users', { name: data.name });
			title = 'Nome atualizado com sucesso!';
			action = 'success';
			passwordFormData.reset({
				password_old: '', // Clear the old password field
				password: '', // Clear the new password field
				password_confirm: '', // Clear the confirm password field
			});
			const updateUser = user;
			updateUser.name = data.name;
			await updateUserProfile(updateUser);
		} catch (error) {
			const isAppError = error instanceof AppError;
			title = isAppError ? error.message : 'Não foi possivel atualizar a senha.';
			action = 'error';
		} finally {
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action={action}
						title={title}
						onClose={() => toast.close(id)}
					/>
				),
			});
			setIsLoading(false);
		}
	}

	async function handlePasswordUpdate(data: PasswordDataProps) {
		let title = '';
		let action: 'success' | 'error' | undefined = 'success';
		try {
			setIsLoading(true);
			await api.put('/users', {
				password: data.password,
				old_password: data.password_old,
			});
			title = 'Senha atualizada com sucesso!';
			action = 'success';
		} catch (error) {
			const isAppError = error instanceof AppError;
			title = isAppError ? error.message : 'Não foi possivel atualizar a senha.';
			action = 'error';
		} finally {
			passwordFormData.reset({
				password_old: '', // Clear the old password field
				password: '', // Clear the new password field
				password_confirm: '', // Clear the confirm password field
			});
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action={action}
						title={title}
						onClose={() => toast.close(id)}
					/>
				),
			});
			setIsLoading(false);
		}
	}

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
			{isLoading ? (
				<GS.VStack mt="$20" alignItems="center" justifyContent="center">
					<Loading />
				</GS.VStack>
			) : (
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
							<Controller
								control={userFormData.control}
								name="name"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Nome"
										bg="$gray600"
										onChangeText={onChange}
										value={value}
										errorMessage={userFormData.formState.errors.name?.message}
									/>
								)}
							/>
							<Controller
								control={userFormData.control}
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
								control={passwordFormData.control}
								name="password_old"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Senha antiga"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value}
										errorMessage={
											passwordFormData.formState.errors.password_old?.message
										}
									/>
								)}
							/>
							<Controller
								control={passwordFormData.control}
								name="password"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Senha"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value}
										errorMessage={
											passwordFormData.formState.errors.password?.message
										}
									/>
								)}
							/>
							<Controller
								control={passwordFormData.control}
								name="password_confirm"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Confirmar senha"
										bg="$gray600"
										secureTextEntry
										onChangeText={onChange}
										value={value}
										errorMessage={
											passwordFormData.formState.errors.password_confirm?.message
										}
									/>
								)}
							/>
							<Button
								title="Atualizar"
								onPress={() => {
									const currentName = userFormData.getValues('name');
									if (currentName !== initialName) {
										// If the name has changed, submit the user form
										userFormData.handleSubmit(handleProfileUpdate)();
									} else {
										// If the name has not changed, submit the password form
										passwordFormData.handleSubmit(handlePasswordUpdate)();
									}
								}}
								isLoading={isLoading}
							/>
						</GS.Center>
					</GS.Center>
				</ScrollView>
			)}
		</GS.VStack>
	);
}
