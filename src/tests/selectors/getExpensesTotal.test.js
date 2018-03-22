import getExpensesTotal from '../../selectors/getExpensesTotal';
import expenses from '../fixtures/expenses';

const expensesTotal = 114195, defaultTotal = 0;


test('should return 0 as a default value', ()=>{
    const total = getExpensesTotal([]);
    expect(total).toBe(defaultTotal);
})

test('should return total expenses', ()=>{
    const total = getExpensesTotal(expenses);
    expect(total).toBe(expensesTotal);
})

test('should return single expense amount', ()=>{
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toBe(expenses[0].amount);
})