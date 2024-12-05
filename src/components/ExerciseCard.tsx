import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as GS from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';

type Props = TouchableOpacityProps & {
	data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Props) {
	return (
		<TouchableOpacity {...rest}>
			<GS.HStack
				bg="$gray500"
				alignItems="center"
				p="$2"
				pr="$4"
				rounded="$md"
				mb="$3"
			>
				<GS.Image
					w="$16"
					h="$16"
					rounded="$md"
					mr="$4"
					resizeMode="cover"
					alt="imagem do exercicio"
					source={{
						uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
					}}
				/>
				<GS.VStack flex={1}>
					<GS.Heading
						lineHeight='$sm'
						fontSize="$lg"
						color="$white"
						fontFamily="$heading"
					>
						{data.name}
					</GS.Heading>
					<GS.Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
						{data.series} séries x {data.repetitions} repetições
					</GS.Text>
				</GS.VStack>
				<GS.Icon as={ChevronRight} color="$gray300" />
			</GS.HStack>
		</TouchableOpacity>
	);
}
