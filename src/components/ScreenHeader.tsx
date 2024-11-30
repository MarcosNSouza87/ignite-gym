import * as GS from '@gluestack-ui/themed';

type Props = {
  title: string
}

export function ScreenHeader({title}: Props) {
	return (
    <GS.Center bg='$gray600'
      pb='$6'
      pt='$16'
    >
      <GS.Heading
        color='$gray100'
        fontSize='$xl'
        fontFamily='$heading'
      >{title}</GS.Heading>
    </GS.Center>
  )
}