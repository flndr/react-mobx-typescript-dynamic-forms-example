import React from 'react';
import api   from 'Services/Api';
import logo  from './logo.svg';
import './App.css';

api.getItems()
   .then( items => console.log( 'Example Items', items ) )
   .catch( e => console.warn( 'Example Ouhhh', e ) );

const App : React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={ logo } className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
