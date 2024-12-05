import * as GS from '@gluestack-ui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeNavigatorRoutesProps } from '@routes/home.routes';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { ToastMessage } from '@components/ToastMessage';
import { api } from '@services/api';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { useEffect, useState } from 'react';
import { Loading } from '@components/Loading';

type RouteParamsProps = {
	exerciseId: string;
};

export function Exercise() {
	const [isLoading, setIsLoading] = useState(true);
	const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
	const { navigate } = useNavigation<HomeNavigatorRoutesProps>();
	const route = useRoute();
	const toast = GS.useToast();
	const { exerciseId } = route.params as RouteParamsProps;

	function handleGoBack() {
		navigate('homeStack');
	}

	async function fetchExerciseDetails() {
		try {
			setIsLoading(true);
			const resp = await api.get(`/exercises/${exerciseId}`);
			setExercise(resp.data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			console.log(error);
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title={
							isAppError
								? error.message
								: 'Não foi possivel carregar os detalhes do exercicio.'
						}
						onClose={() => toast.close(id)}
					/>
				),
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchExerciseDetails();
	}, [exerciseId]);

	return (
		<GS.VStack flex={1}>
			<GS.VStack px="$5" bg="$gray600" pt="$12">
				<GS.HStack
					justifyContent="space-between"
					alignItems="center"
					marginVertical="$6"
				>
					<TouchableOpacity onPress={handleGoBack}>
						<GS.Icon as={ArrowLeft} color="$green500" size="xl" />
					</TouchableOpacity>
					<GS.Heading
						color="$gray100"
						fontFamily="$heading"
						textAlign="left"
						fontSize="$lg"
						flex={1}
						flexShrink={1}
						lineHeight={'$sm'}
						marginHorizontal="$5"
					>
						{exercise.name}
					</GS.Heading>
					<GS.HStack alignItems="center">
						<BodySvg />
						<GS.Text color="$gray200" ml="$1" textTransform="capitalize">
							{exercise.group}
						</GS.Text>
					</GS.HStack>
				</GS.HStack>
			</GS.VStack>
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 32 }}
				>
					<GS.VStack p="$8">
						<GS.Box rounded="lg" mb={3} overflow="hidden">
							<GS.Image
								source={{
									uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
								}}
								alt="Imagem do exercicio"
								mb="$3"
								resizeMode="cover"
								rounded="$lg"
								w="$full"
								h="$80"
							/>
						</GS.Box>

						<GS.Box bg="$gray600" rounded="$md" pb="$4" px="$4">
							<GS.HStack
								alignItems="center"
								justifyContent="space-around"
								mb="$6"
								mt="$5"
							>
								<GS.HStack alignItems="center">
									<SeriesSvg />
									<GS.Text color="$gray200" ml="$2">
										{exercise.series} séries
									</GS.Text>
								</GS.HStack>
								<GS.HStack alignItems="center">
									<RepetitionSvg />
									<GS.Text color="$gray200" ml="$2">
										{exercise.repetitions} repetições
									</GS.Text>
								</GS.HStack>
							</GS.HStack>
							<Button title="Marcar como realizado" />
						</GS.Box>
					</GS.VStack>
				</ScrollView>
			)}
		</GS.VStack>
	);
}
