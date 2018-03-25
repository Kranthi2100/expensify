import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

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

test('should setup add expense action object with provided values', (done) => {
 const store = createMockStore({});
 const expenseData = {
  description : 'mouse',
  amount: 3000,
  note: 'asidfjd',
  createdAt: 34534534
 }
 store.dispatch(startAddExpense(expenseData)).then(()=>{
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

test('should setup add expense action object with default values', () => {
  const store = createMockStore({});
  const expenseDefault = {
   description : '',
   amount: 0,
   note: '',
   createdAt: 0  
  }
  store.dispatch(startAddExpense(expenseDefault)).then(()=>{
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
