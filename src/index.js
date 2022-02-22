import './app.css';
import { Calculator } from './calculator';
import { getCurrentThemeName, loadTheme, toggleTheme } from './themes/theme-switcher';

const calculator = new Calculator();
let currentSelectedOperation = null;

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
    calculator.chooseOperation(operation);

    if (['RESET', '=', 'DEL'].includes(operation) && currentSelectedOperation) {
        currentSelectedOperation.classList.toggle('active');
        currentSelectedOperation = null;
        return;
    }

    if (currentSelectedOperation) {
        currentSelectedOperation.classList.toggle('active')    
    }

    currentSelectedOperation = this
    currentSelectedOperation.classList.toggle('active');
}

function numberButtonListener() {
    const text = this.textContent;
    calculator.appendNumber(text);
}

bootstrap();