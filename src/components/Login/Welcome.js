import { Text } from "react-native"
import {
    Button,
    ButtonText,
    ButtonSpinner,
    ButtonIcon,
    ButtonGroup,
  } from "@/components/ui/button"

const Welcome = () => {
    return (
        <Button size="md" variant="solid" action="primary">
            <ButtonText>Hello World!</ButtonText>
        </Button>
    )
}

export default Welcome