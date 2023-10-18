import { type ThemeDefinition } from 'vuetify';
import { blueTheme } from './blueTheme';
import { useValue } from '@/utils/common_utils';

type Themes = Record<string, ThemeDefinition>;

export interface ThemeInfo {
    key: string;
    label: string;
    icon: string;
}

export interface ThemesConfig {
    [key: string]: {
        defined?: ThemeDefinition;
        label: string;
        icon: string;
    };
}

export type ThemeKey = keyof typeof themeConfigs;

export const systemThemeKey = useValue(() => {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkTheme ? 'dark' : 'light';
});

export const themeConfigs = {
    system: {
        label: 'System theme',
        icon: 'mdi:mdi-theme-light-dark',
    },
    dark: {
        label: 'Dark',
        icon: 'mdi:mdi-weather-night',
    },
    light: {
        label: 'Light',
        icon: 'mdi:mdi-white-balance-sunny',
    },
    blue: {
        defined: blueTheme,
        label: 'Blue',
        icon: 'mdi:mdi-snowflake',
    },
} satisfies ThemesConfig;

export const themes = useValue<Themes>(() => {
    const result: Themes = {};

    for (const key in themeConfigs) {
        const defined = (themeConfigs as ThemesConfig)[key].defined;
        if (!defined) continue;

        result[key] = defined;
    }

    return Object.freeze(result);
});

export const themesList = useValue<readonly Readonly<ThemeInfo>[]>(() => {
    const result: ThemeInfo[] = [];

    for (const key in themeConfigs) {
        const { icon, label } = (themeConfigs as ThemesConfig)[key];

        result.push(Object.freeze({ icon, label, key }));
    }

    return Object.freeze(result);
});

export const themeKeys = Object.freeze(Object.keys(themeConfigs));
