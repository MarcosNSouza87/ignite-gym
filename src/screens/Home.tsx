import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';
import { ToastMessage } from '@components/ToastMessage';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import * as GS from '@gluestack-ui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HomeNavigatorRoutesProps } from '@routes/home.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export function HomeScreen() {
	const [isLoading, setIsLoading] = useState(true);
	const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
	const { navigate } = useNavigation<HomeNavigatorRoutesProps>();
	const toast = GS.useToast();
	const [groups, setGroups] = useState<string[]>([]);

	const [groupSelected, setGroupSelected] = useState('');

	function handleOpenDetailsExercise(exerciseId: string) {
		navigate('exercise', {exerciseId});
	}

	async function fetchGroups() {
		try {
			const response = await api.get('/groups');
			setGroups(response.data);
			setGroupSelected(response.data[0]);
		} catch (error) {
			const isAppError = error instanceof AppError;
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title={
							isAppError
								? error.message
								: 'Não foi possivel carregar os grupos musculares.'
						}
						onClose={() => toast.close(id)}
					/>
				),
			});
		}
	}

	async function fetchExercisesByGroup() {
		try {
			setIsLoading(true);
			const response = await api.get(`/exercises/bygroup/${groupSelected}`);
			setExercises(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			toast.show({
				placement: 'top',
				render: ({ id }) => (
					<ToastMessage
						id={id}
						action="error"
						title={
							isAppError
								? error.message
								: 'Não foi possivel carregar os grupos musculares.'
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
		fetchGroups();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchExercisesByGroup();
		}, [groupSelected]),
	);

	return (
		<GS.VStack flex={1}>
			<HomeHeader />
			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 32 }}
				style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupSelected === item}
						onPress={() => setGroupSelected(item)}
					/>
				)}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<GS.VStack flex={1} px="$8">
					<GS.HStack justifyContent="space-between" mb="$5" alignItems="center">
						<GS.Heading color="$gray200" fontSize="$md" fontFamily="$heading">
							Exercícios
						</GS.Heading>
						<GS.Text color="$gray200" fontSize="$sm" fontFamily="$body">
							{exercises.length}
						</GS.Text>
					</GS.HStack>
					<FlatList
						data={exercises}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ExerciseCard data={item} onPress={() => handleOpenDetailsExercise(item.id)} />
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				</GS.VStack>
			)}
		</GS.VStack>
	);
}
