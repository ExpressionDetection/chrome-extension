import { variant } from "styled-system";

export const styling = variant({
  prop: "styling",
  variants: {
    base: {
      fontFamily: "Quicksand",
      fontWeight: 400,
      color: "text.default"
    },
    get light() {
      return {
        ...this.base,
        fontWeight: 300,
      };
    },
    get regular() {
      return {
        ...this.base,
        fontWeight: 400,
      };
    },
    get medium() {
      return {
        ...this.base,
        fontWeight: 500,
      };
    },
    get semiBold() {
      return {
        ...this.base,
        fontWeight: 600,
      };
    },
    get bold() {
      return {
        ...this.base,
        fontWeight: 700,
      };
    },
  },
});
