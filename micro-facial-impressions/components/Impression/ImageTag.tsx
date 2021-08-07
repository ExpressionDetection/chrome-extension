import { useState } from "react"
import { Box, Button, Image } from "../system"
import { colors, Label } from "../system/theme/colors"


const ImageTag = ({ image }) => {
    const [hovered, set] = useState(false)
    const toggle = () => set(prev => !prev)
    const [selections, setSelections] = useState(colors)
    const setSelection = (key: Label) => setSelections(prev => ({
        ...prev,
        [key]: {
            key,
            selected: !prev[key]?.selected ?? true
        }
    }))
    return <Box
        display="flex"
        flex={1}
        width="100%"
        flexDirection="row"
        position="relative"
        onMouseEnter={toggle}
        onMouseLeave={toggle}
        borderRadius="16px">
        <Image
            src={image}
            width="100%"
            flex={1}
            opacity={hovered ? 0.2 : 1}
            borderRadius="16px"
        />
        {hovered && <Box position="absolute" display="flex" flexWrap="wrap" flexDirection="row" height="100%" alignItems="center" justifyContent="center">
            {Object.entries(selections).map(([key, value]) => <Button styling="primary" mx="sm" onClick={() => setSelection(key)} outline={value.selected ? false : true}>{key}</Button>)}
        </Box>}
    </Box>
}

export default ImageTag