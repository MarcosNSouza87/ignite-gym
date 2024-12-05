import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { ToastMessage } from '@components/ToastMessage';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import * as GS from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

export function History() {
	const [isLoading, setIsLoading] = useState(true);
	const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

	const toast = GS.useToast();

	async function fetchHistory() {
		try {
			setIsLoading(true);
			const response = await api.get('/history');
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
							isAppError ? error.message : 'Não foi possivel carregar o histórico.'
						}
						onClose={() => toast.close(id)}
					/>
				),
			});
		} finally {
			setIsLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchHistory();
		}, []),
	);

	return (
		<GS.VStack flex={1}>
			<ScreenHeader title="Histórico de Exercícios" />
			<SectionList
				sections={exercises}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <HistoryCard data={item} />}
				renderSectionHeader={({ section }) => (
					<GS.Heading
						color="$gray200"
						fontSize="$md"
						mt="$10"
						mb="$3"
						fontFamily="$heading"
					>
						{section.title}
					</GS.Heading>
				)}
				style={{ paddingHorizontal: 32 }}
				contentContainerStyle={
					exercises.length === 0 && { flex: 1, justifyContent: 'center' }
				}
				ListEmptyComponent={() => (
					<GS.Text color="$gray100" textAlign="center">
						Nao há exercícios registrado ainda. {'\n'}Vamos fazer exercicios hoje?
					</GS.Text>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</GS.VStack>
	);
}
