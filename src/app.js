import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpense, setExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import database,{ firebase } from './firebase/firebase';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import './firebase/firebase';
const store = configureStore();

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

store.dispatch(startSetExpense()).then(() => ReactDOM.render(jsx, document.getElementById('app')));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('logged in!');
  } else {
    console.log('logged out!')
  }
})

database.ref('expenses').on('value', snapshot => {
  let expenses = [];
  snapshot.forEach( childSnapshot => {
    expenses.push(id: childSnapshot.key, ...childSnapshot.val());
  })
  store.dispatch(setExpense(expenses))
})