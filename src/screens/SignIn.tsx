import {
	VStack,
	Image,
	Center,
	Text,
	Heading,
	ScrollView,
	useToast,
} from '@gluestack-ui/themed';
import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';
import { ToastMessage } from '@components/ToastMessage';

type FormDataProps = {
	email: string;
	password: string;
};

const signUpSchema = yup.object({
	email: yup.string().required('Informe o E-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 digítos.'),
});

export function SignIn() {
	const { signIn } = useAuth();
	const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
	});

	function handleNewAccount() {
		navigate('signUp');
	}
	async function handleSignIn({ email, password }: FormDataProps) {
		try {
			//console.log({email, password})
			setIsLoading(true);
			const validate = await signIn(email, password);
			//console.log(validate);
			// navigate to other route
			
		} catch (error) {
			const isAppError = error instanceof AppError;
			console.log(error)
			const title = isAppError
				? error.message
				: 'Não foi possível entrar. Tente novamente';
			setIsLoading(false);
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title={title}
						onClose={() => toast.close(id)}
					/>
				),
			});
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1}>
				<Image
					w="$full"
					h={624}
					source={BackgroundImg}
					defaultSource={BackgroundImg}
					alt="Pessoas treinando"
					position="absolute"
				/>
				<VStack flex={1} px="$10" pb="$16">
					<Center my="$24">
						<Logo />
						<Text color="$gray100" fontSize="$sm">
							Treine sua mente e o seu corpo
						</Text>
					</Center>
					<Center gap="$2">
						<Heading color="$gray100">Acesse sua conta</Heading>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
								<Input
									value={value}
									onChangeText={onChange}
									placeholder="E-mail"
									keyboardType="email-address"
									autoCapitalize="none"
									errorMessage={errors.email?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value } }) => (
								<Input
									onChangeText={onChange}
									value={value}
									placeholder="Senha"
									secureTextEntry
									autoCapitalize="none"
									errorMessage={errors.password?.message}
								/>
							)}
						/>
						<Button
							title="Acessar"
							onPress={handleSubmit(handleSignIn)}
							isLoading={isLoading}
						/>
					</Center>
					<Center flex={1} justifyContent="flex-end" mt="$4">
						<Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
							Ainda não tenho acesso?
						</Text>
						<Button
							title="Criar conta"
							variant="outline"
							onPress={handleNewAccount}
						/>
					</Center>
				</VStack>
			</VStack>
		</ScrollView>
	);
}
