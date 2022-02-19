import './app.css';
import { getCurrentThemeName, loadTheme, toggleTheme } from './themes/theme-switcher';

function bootstrap() {
    const currentThemeName = getCurrentThemeName();

    if (currentThemeName !== 'dark-blue')
        loadTheme(currentThemeName);

    bindEventListeners();
    bindButtons();
}

function bindEventListeners() {
    const switcherEl = document.getElementById('switcher');
    switcherEl.addEventListener('click', toggleTheme);
}

function bindButtons() {
    const numberButtons = document.querySelectorAll('.keypad-button:not(.control)');
    const controlButtons = document.querySelectorAll('.keypad-button.control');

    numberButtons.forEach(button => button.addEventListener('click', numberButtonListener))
    controlButtons.forEach(button => button.addEventListener('click', controlButtonListener))
}

function controlButtonListener() {
    const operation = this.textContent;
}

function numberButtonListener() {
    const text = this.textContent;
}

bootstrap();