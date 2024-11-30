import * as GS from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GS.Button> & {
  name: string
  isActive: boolean
}


export function Group ({name, isActive, ...rest}: Props) {
  return(
    <GS.Button 
    minWidth="$24"
    h="$10"
    bg="$gray600"
    mx='$1'
    rounded="$md"
    justifyContent='center'
    borderColor='$green500'
    borderWidth={isActive ? 1 : 0}
    sx={{
      ":active":{
        borderWidth: 1,
      }
    }}
    {...rest}>
      <GS.Text
        color={
          isActive ? '$green500' : '$gray200'
        }
        textTransform='uppercase'
        fontSize='$xs'
        fontFamily='$heading'
      >{name}</GS.Text>
    </GS.Button>
  )
}