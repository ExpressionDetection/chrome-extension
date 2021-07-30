import styled from "styled-components";
import { space, layout, color, typography, position } from "styled-system";
import { CssProperties, DefaultStyleProps } from "../theme/types";
import { styling } from "./text.variants";

type StylingType =
  | "base"
  | "light"
  | "regular"
  | "medium"
  | "semi-bold"
  | "bold";

type TextStyledProps = DefaultStyleProps & CssProperties;

interface TextProps extends TextStyledProps {
  styling?: StylingType;
}

const Text: React.FC<TextProps> = styled.span`
    ${space}
    ${layout}
    ${position}
    ${color}
    ${typography}
    ${styling}
`;

export default Text;
