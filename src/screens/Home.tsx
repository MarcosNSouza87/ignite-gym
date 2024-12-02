import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import * as GS from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigatorRoutesProps } from '@routes/home.routes';
import { useState } from 'react';
import { FlatList } from 'react-native';

export function HomeScreen() {
	const [exercises, setExercises] = useState([
		'Puxada Frontal',
		'Remada Curvada',
		'Remada unilateral',
		'Flexao de braco',
		'Levantamento Frontal',
		'1Puxada Frontal',
		'2Remada Curvada',
		'3Remada unilateral',
		'4Flexao de braco',
		'5Levantamento Frontal',
	]);
	const { navigate } = useNavigation<HomeNavigatorRoutesProps>();

	const [groups, setGroups] = useState(['Costas', 'Biceps', 'Tríceps', 'Ombro']);

	const [groupSelected, setGroupSelected] = useState('Costas');

	function handleOpenDetailsExercise() {
		navigate('exercise');
	}

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
			<GS.VStack px="$8">
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
					keyExtractor={(item) => item}
					renderItem={() => <ExerciseCard onPress={handleOpenDetailsExercise} />}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 20 }}
				/>
			</GS.VStack>
		</GS.VStack>
	);
}
