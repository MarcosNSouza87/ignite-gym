import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import * as GS from '@gluestack-ui/themed';
import { useState } from 'react';
import { SectionList } from 'react-native';

export function History() {
	const [exercises, setExercises] = useState([
		{ title: '22.07.24', data: ['Puxada frontal'] },
		{ title: '23.07.24', data: ['Puxada frontal', 'Remada Unilateral'] },
	]);
	return (
		<GS.VStack flex={1}>
			<ScreenHeader title="Histórico de Exercícios" />
			<SectionList
				sections={exercises}
				keyExtractor={(item) => item}
				renderItem={() => <HistoryCard />}
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
        style={{paddingHorizontal: 32}}
        contentContainerStyle={
          exercises.length === 0 && {flex: 1, justifyContent: 'center'}
        }
        ListEmptyComponent={() => (
          <GS.Text color='$gray100' textAlign='center'>
            Nao há exercícios registrado ainda. {"\n"}Vamos fazer exercicios hoje?
          </GS.Text>
        )}
        showsVerticalScrollIndicator={false}
			/>
		</GS.VStack>
	);
}
