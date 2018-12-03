
export default {
  direction: 'ltr',
  palette: {
    type: 'light',
    primary: {
      main: '#0277BD',
      dark: '#015384',
    },
    secondary: {
      main: '#E65100',
      dark: '#DD2C00',
    },
    error: {
      main: '#DD2C00',
      dark: '#DD2C00',
    }
  },
  typography: {
    useNextVariants: true,
  },
};


//   import { indigo ,red,pink  } from "@material-ui/core/colors";

// export default {
//     direction: 'ltr',
//     palette: {
//       type: 'light',
//       primary: indigo,
//     secondary: pink,
//     error: red,
//     // Used by `getContrastText()` to maximize the contrast between the background and
//     // the text.
//     contrastThreshold: 3,
//     // Used to shift a color's luminance by approximately
//     // two indexes within its tonal palette.
//     // E.g., shift from Red 500 to Red 300 or Red 700.
//     tonalOffset: 0.1,
//     },
//     typography: {
//       useNextVariants: true,
//     },
//   };