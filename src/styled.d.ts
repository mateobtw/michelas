import 'styled-components';

// Extiende el tema por defecto de styled-components
// para que TypeScript conozca las props que usas
// en lightTheme y darkTheme.
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    background: string;
    border: string;
    altColor: string;
    gradient: string;
    random?: string; // solo está en darkTheme, por eso es opcional
  }
}
