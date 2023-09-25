import { ThemeDefinition as _ThemeDefinition } from 'vuetify';

export {}

declare module "vuetify" {
    interface InternalThemeDefinition{
        colors: {
            dark: string;
            white: string;
            primary: string;
            secondary: string;
            cardBackground: string;
            background: string;
        }
    }
}