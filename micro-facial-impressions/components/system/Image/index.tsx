import styled from "styled-components";
import { space, layout, color, flexbox, border } from "styled-system";
import { BoxProps } from "../Box/box.types";

interface ImgProps {
    src?: string
}

const Image: React.FC<BoxProps & ImgProps> = styled.img`
    ${space}
    ${layout}
    ${color}
    ${border}
    ${flexbox}
`;

export default Image;
