import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import * as GS from '@gluestack-ui/themed';
import {ChevronRight} from 'lucide-react-native'
 
type Props = TouchableOpacityProps

export function ExerciseCard({...rest}: Props) {
  return(
    <TouchableOpacity {...rest}>
      <GS.HStack bg='$gray500' alignItems="center" p='$2' pr='$4' rounded='$md' mb='$3'>
        <GS.Image
        w='$16'
        h='$16'
        rounded='$md'
        mr='$4'
        resizeMode='cover'
        alt='imagem do exercicio'
        source={{uri:'https://i.pinimg.com/236x/e9/d6/0a/e9d60a782c98814b9c35aaf53f1c95c3.jpg'}} />
        <GS.VStack flex={1}>
          <GS.Heading fontSize='$lg' color='$white' fontFamily="$heading">
            Puxada Lateral
          </GS.Heading>
          <GS.Text fontSize='$sm' color='$gray200' mt='$1'
           numberOfLines={2}>
            3 séries x 12 repetições
          </GS.Text>
        </GS.VStack>
        <GS.Icon as={ChevronRight} color='$gray300' />
      </GS.HStack>
    </TouchableOpacity>
  )
}