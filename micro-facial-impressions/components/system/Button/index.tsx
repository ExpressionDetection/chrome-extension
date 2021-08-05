import styled from "styled-components";
import {
  border,
  color,
  flexbox,
  fontSize,
  layout,
  position,
  space,
  system,
  typography,
} from "styled-system";
import { ButtonProps } from "./button.types";
import { sizes, styling, outline, text, block } from "./button.variants";

export const Button: React.FC<ButtonProps> = styled.button<ButtonProps>`
  ${styling}
  ${layout}
  ${position}
  ${flexbox}
  ${space}
  ${typography}
  ${color}
  ${border}
  ${fontSize}
  ${sizes}
  ${system({ transition: true, animationFillMode: true })}
  ${outline}
  ${text}
  ${block}
`;

export default Button;
