import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import user_reducer from './ducks/user_reducer';

export default createStore(user_reducer, {}, applyMiddleware(promiseMiddleware()));