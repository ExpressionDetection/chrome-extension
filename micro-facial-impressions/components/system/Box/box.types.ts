import { CSSProp } from "styled-components";
import { DefaultStyleProps, CssProperties } from "../theme/types";

export type BoxStyledProps = DefaultStyleProps & CssProperties;

export interface BoxProps extends BoxStyledProps {
  styling?: "base" | "row" | "column" | "grid";
  css?: CSSProp;
  boxShadow?: string
  gap?: string
}
