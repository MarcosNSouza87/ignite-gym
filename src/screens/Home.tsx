import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import * as GS from '@gluestack-ui/themed';
import { useState } from 'react';
import { FlatList } from 'react-native';

export function Home() {
	const [groups, setGroups] = useState(['Costas', 'Biceps', 'Tríceps', 'Ombro']);
	const [groupSelected, setGroupSelected] = useState('Costas');
	return (
		<GS.VStack flex={1}>
			<HomeHeader />
			<FlatList
				data={groups}
				keyExtractor={(item) => item}
        horizontal
        contentContainerStyle={{paddingHorizontal: 32}}
        style={{marginVertical: 40, maxHeight: 44, minHeight: 44}}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupSelected === item}
						onPress={() => setGroupSelected(item)}
					/>
				)}
			/>
		</GS.VStack>
	);
}
