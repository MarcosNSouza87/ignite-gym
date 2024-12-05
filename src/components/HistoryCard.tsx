import { HistoryDTO } from '@dtos/HistoryDTO';
import * as GS from '@gluestack-ui/themed';

type Props = {
	data: HistoryDTO;
};

export function HistoryCard({ data }: Props) {
	return (
		<GS.HStack
			w="$full"
			px="$5"
			py="$4"
			mb="$3"
			bg="$gray600"
			rounded="$md"
			alignItems="center"
			justifyContent="space-between"
		>
			<GS.VStack flex={1} mr="$5">
				<GS.Heading
					color="$white"
					fontSize="$md"
					textTransform="capitalize"
					fontFamily="$heading"
					numberOfLines={1}
				>
					{data.group}
				</GS.Heading>
				<GS.Text color="$gray100" fontSize="$lg" numberOfLines={1}>
					{data.name}
				</GS.Text>
			</GS.VStack>

			<GS.Text color="$gray300" fontSize="$md">
				{data.hour}
			</GS.Text>
		</GS.HStack>
	);
}
