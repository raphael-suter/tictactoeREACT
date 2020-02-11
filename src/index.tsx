import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => (
    <>
        <h1>Hello World!</h1>
        <img src='./img/logo192.png' alt='logo'/>
    </>
);

ReactDOM.render(<App/>, document.getElementById('root'));
