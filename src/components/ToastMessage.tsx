import * as GS from '@gluestack-ui/themed';

import { X } from 'lucide-react-native';

type Props = {
	id: string;
	title: string;
	description?: string;
	action?: 'error' | 'success';
	onClose: () => void;
};

export function ToastMessage({
	id,
	title,
	description,
	action = 'success',
	onClose,
}: Props) {
	return (
		<GS.Toast
			nativeID={`toast-${id}`}
			action={action}
			bgColor={action === 'success' ? '$green500' : '$red500'}
			mt="$10"
		>
			<GS.VStack space="xs" w="$full">
				<GS.Pressable onPress={onClose} alignSelf="flex-end">
					<GS.Icon as={X} color="$coolGray50" size="md" ml="$5" />
				</GS.Pressable>
				<GS.ToastTitle color="$white" fontFamily="$heading" numberOfLines={2}>
					{title}
				</GS.ToastTitle>
				{description && (
					<GS.ToastDescription color="$white" fontFamily="$body">
						{description}
					</GS.ToastDescription>
				)}
			</GS.VStack>
		</GS.Toast>
	);
}
