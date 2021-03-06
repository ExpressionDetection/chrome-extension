const theme = (dark = false): any => ({
  dark,
  get primary() {
    return {
      default: this.dark ? "#375a7f" : "#967CFF",
      dark: "#375a7f",
      light: "#007bff",
      hover: this.dark ? "#2f4d6c" : "#967CFF",
      contrast: this.dark ? "#ffffff" : "#ffffff",
    };
  },
  get secondary() {
    return {
      default: this.dark ? "#444444" : "#00A3FF",
      dark: "#444444",
      light: "#6c757d",
      hover: this.dark ? "#3a3a3a" : "#00A3FF",
      contrast: "#f8f9fa",
    };
  },
  get terciary() {
    return {
      default: this.dark ? "#444444" : "#6c757d",
      dark: "#444444",
      light: "#6c757d",
      hover: this.dark ? "#3a3a3a" : "#5a6268",
      contrast: "#f8f9fa",
    };
  },
  get success() {
    return {
      default: this.dark ? "#00bc8c" : "#28a745",
      dark: "#00bc8c",
      light: "#28a745",
      hover: this.dark ? "#00a077" : "#218838",
      contrast: "#f8f9fa",
    };
  },
  get danger() {
    return {
      default: this.dark ? "#e74c3c" : "#dc3545",
      dark: "#e74c3c",
      light: "#dc3545",
      hover: this.dark ? "#c44133" : "#c82333",
      contrast: "#f8f9fa",
    };
  },
  get warning() {
    return {
      default: this.dark ? "#f39c12" : "#ffc107",
      dark: "#f39c12",
      light: "#ffc107",
      hover: this.dark ? "#cf850f" : "#e0a800",
      contrast: "#343a40",
    };
  },
  get info() {
    return {
      default: this.dark ? "#3498db" : "#17a2b8",
      dark: "#3498db",
      light: "#17a2b8",
      hover: this.dark ? "#2c81ba" : "#138496",
      contrast: "#f8f9fa",
    };
  },
  get background() {
    return {
      default: this.dark ? "#f8f9fa" : "#F9F9FB",
      card: this.dark ? "#f8f9fa" : "#FFFFFF",
      dark: "#f8f9fa",
      light: "#F9F9FB",
    };
  },
  get text() {
    return {
      default: this.dark ? "#f8f9fa" : "#3D3636",
      dark: this.dark ? "#f8f9fa" : "#f8f9fa",
      light: this.dark ? "#3D3636" : "#B9B7BD",
    };
  },
});


export type Label = "neutral" | "anger" | "contempt" | "disgust" | "fear" | "happy" | "sadness" | "surprise"

export const colors = {
  neutral: "#1EE449",
  anger: "#DB1F48",
  contempt: "#004369",
  disgust: "#FFBA33",
  fear: "#FB6090",
  happy: "#57BFFA",
  sadness: "#801CFF",
  surprise: "#FAD02C"
}

export default theme