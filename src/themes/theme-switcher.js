import darkBlue from './dark-blue';
import darkViolet from './dark-violet';
import lightGray from './light-gray';

const themeDitcionary = {
    'dark-blue': darkBlue,
    'dark-violet': darkViolet,
    'light-gray': lightGray
}

const nextThemeNameDictionary = {
    'dark-blue': 'light-gray',
    'dark-violet': 'dark-blue',
    'light-gray': 'dark-violet'
}

const togglePositionByTheme = {
    'dark-blue': 0,
    'dark-violet': 2,
    'light-gray': 1
}

const STORAGE_THEME_KEY = '@liverday-calculator/theme';
const SWITCHER_PADDING = 3;
const TOGGLER_WIDTH = 12;

export function loadTheme(themeName) {
    const theme = themeDitcionary[themeName];

    if (!theme) {
        throw new Error('Invalid theme');
    }

    Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });

    moveToggler(themeName);
}

export function saveTheme(themeName) {
    localStorage.setItem(STORAGE_THEME_KEY, themeName);
}

export function getCurrentThemeName() {
    return localStorage.getItem(STORAGE_THEME_KEY) || 'dark-blue';
}

export function toggleTheme() {
    const currentThemeName = getCurrentThemeName();
    const nextThemeName = getNextTheme(currentThemeName);
    loadTheme(nextThemeName);
    saveTheme(nextThemeName);
}


function getNextTheme(currentThemeName) {
    return nextThemeNameDictionary[currentThemeName];
}

function moveToggler(toThemeName) {
    const toggler = document.getElementById('toggler');
    const togglePositionOnTheme = togglePositionByTheme[toThemeName];
    const toggleWidth = Math.min(toggler.clientWidth, TOGGLER_WIDTH);
    const pixelsToTranslate = (togglePositionOnTheme * toggleWidth) + (togglePositionOnTheme * SWITCHER_PADDING);
    toggler.style.transform = `translateX(${pixelsToTranslate}px)`;
}