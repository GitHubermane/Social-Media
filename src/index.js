import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/ReduxStore'

export let _callSubscriber = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App store={store}/>
        </Provider>,
        document.getElementById('root')
    );
}

_callSubscriber(store.getState());

store.subscribe(() => {
    let state = store.getState(); 
    _callSubscriber(state);
})