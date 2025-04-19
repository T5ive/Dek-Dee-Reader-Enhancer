import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { Preview } from './testings/preview';

const createAppContainer = () => {
    const container = document.createElement('div');
    container.id = 'dek-d-reader-enhancer-root';
    container.style.color = 'black';
    document.body.appendChild(container);
    return container;
};

const init = () => {
    console.log('Dek Dee Reader Enhancer: เริ่มทำงาน');

    const container = createAppContainer();
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

const container = createAppContainer();
const root = ReactDOM.createRoot(container);
root.render(<Preview />);
