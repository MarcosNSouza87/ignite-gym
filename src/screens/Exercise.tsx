import * as GS from '@gluestack-ui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigatorRoutesProps } from '@routes/home.routes';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';

export function Exercise() {
	const { navigate } = useNavigation<HomeNavigatorRoutesProps>();

	function handleGoBack() {
		navigate('homeStack');
	}
	return (
		<GS.VStack flex={1}>
			<GS.VStack px="$8" bg="$gray600" pt="$12">
				<TouchableOpacity onPress={handleGoBack}>
					<GS.Icon as={ArrowLeft} color="$green500" size="xl" />
				</TouchableOpacity>
				<GS.HStack
					justifyContent="space-between"
					alignItems="center"
					mt="$4"
					mb="$8"
				>
					<GS.Heading
						color="$gray100"
						fontFamily="$heading"
						fontSize="$lg"
						flexShrink={1}
					>
						Puxada frontal
					</GS.Heading>
					<GS.HStack alignItems="center">
						<BodySvg />
						<GS.Text color="$gray200" ml="$1" textTransform="capitalize">
							Costas
						</GS.Text>
					</GS.HStack>
				</GS.HStack>
			</GS.VStack>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 32}}>
				<GS.VStack p="$8">
					<GS.Image
						source={{
							uri: 'https://i.pinimg.com/236x/e9/d6/0a/e9d60a782c98814b9c35aaf53f1c95c3.jpg',
						}}
						alt="Imagem do exercicio"
						mb="$3"
						resizeMode="cover"
						rounded="$lg"
						w="$full"
						h="$80"
					/>

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
									3 séries
								</GS.Text>
							</GS.HStack>
							<GS.HStack alignItems="center">
								<RepetitionSvg />
								<GS.Text color="$gray200" ml="$2">
									12 repetições
								</GS.Text>
							</GS.HStack>
						</GS.HStack>
						<Button title="Marcar como realizado" />
					</GS.Box>
				</GS.VStack>
			</ScrollView>
		</GS.VStack>
	);
}
