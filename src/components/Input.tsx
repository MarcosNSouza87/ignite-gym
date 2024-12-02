import {
	Input as GluestackInput,
	InputField,
	FormControl,
	FormControlErrorText,
	FormControlError,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
type Props = ComponentProps<typeof InputField> & {
	isReadOnly?: boolean;
	errorMessage?: string | null;
	isInvalid?: boolean;
};

export function Input({
	errorMessage = null,
	isInvalid = false,
	isReadOnly = false,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid;
	return (
		<FormControl isInvalid={invalid} w="$full" mb="$4">
			<GluestackInput
				h="$14"
				borderWidth="$1"
				borderColor="$gray700"
				borderRadius="$md"
				$invalid={{
					borderWidth: 1,
					borderColor: '$red500',
				}}
				$focus={{
					borderWidth: 1,
					borderColor: invalid ? '$red500' : '$green500',
				}}
				isReadOnly={isReadOnly}
				opacity={isReadOnly ? 0.5 : 1}
			>
				<InputField
					px="$4"
					bg="$gray700"
					color="$white"
					fontFamily="$body"
					placeholderTextColor="$gray300"
					{...rest}
				/>
			</GluestackInput>
			<FormControlError>
				<FormControlErrorText color="$red500">{errorMessage}</FormControlErrorText>
			</FormControlError>
		</FormControl>
	);
}
