import React from 'react';
import api   from 'Services/Api';
import logo  from './logo.svg';
import './App.css';

api.getItems()
   .then( items => console.log( 'Example Items', items ) )
   .catch( e => console.warn( 'Example Ouhhh', e ) );

const App : React.FC = () => {
    return (
        <div className="text-center">
            <header className="bg-purple-darker m-6 p-6">
                <img src={ logo } className="center" alt="logo"/>
                <p className="m-6">
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="m-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
