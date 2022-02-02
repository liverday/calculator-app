import './app.css';
import { getCurrentThemeName, loadTheme, toggleTheme } from './themes/theme-switcher';

function bootstrap() {
    const currentThemeName = getCurrentThemeName();

    if (currentThemeName !== 'dark-blue')
        loadTheme(currentThemeName);

    bindEventListeners();
}

function bindEventListeners() {
    const switcherEl = document.getElementById('switcher');
    

    switcherEl.addEventListener('click', toggleTheme);
}  

bootstrap();