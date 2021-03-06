import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpense,
  startSetExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
const createMockStore = configureMockStore([thunk])
const defaultState = { auth: { uid } };
const uid = 'this_is_my_test_user';

beforeEach(((done) => {
  let expenseData = {};
  expenses.forEach((expense) => {
    expenseData[expense.id] = { ...expense };
  })
  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
}))

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove data from firebase', (done) => {
  const store = createMockStore(defaultState);
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should edit expenses in firebase', (done) => {
  const store = createMockStore(defaultState);
  const expense = expenses[0];
  const updates = {
    'description': 'gums'
  }
  store.dispatch(startEditExpense(expense.id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expense.id,
      updates
    })
    return database.ref(`users/${uid}/expenses/${expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      ...expense,
      ...updates
    })
    done();
  })
})

test('should setup add expense action object with provided values', (done) => {
  const store = createMockStore(defaultState);
  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'asidfjd',
    createdAt: 34534534
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })
    done();
  });
});

test('should setup add expense action object with default values', (done) => {
  const store = createMockStore(defaultState);
  const expenseDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense(expenseDefault)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    })
    done();
  });
});

test('should set expenses', () => {
  const action = setExpense(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSE',
    expenses
  })
})

test('should get data from firebase', (done) => {
  const store = createMockStore(defaultState);
  store.dispatch(startSetExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSE',
      expenses
    })
    done();
  })
})