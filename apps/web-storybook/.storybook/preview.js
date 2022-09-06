
import { addDecorator } from '@storybook/react';
import { theme } from "../../web/theme";
import { ThemeProvider } from "@mui/material/styles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
));