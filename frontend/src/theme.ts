import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00579C",
    },
    secondary: {
      main: "#F57C00",
    },
    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#212121",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
});
export default theme;
