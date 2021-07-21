import styled from "styled-components";
import { space, layout, color, typography } from "styled-system";
import { BoxProps } from "../Box/box.types";

const Text: React.FC<BoxProps> = styled.span`
    ${space}
    ${layout}
    ${color}
    ${typography}
`;

export default Text;
