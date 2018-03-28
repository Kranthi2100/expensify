import React from 'react';
import { shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
let removeExpense, editExpense, history, wrapper;
beforeEach(()=>{
    removeExpense = jest.fn();
    editExpense = jest.fn();
    history = {
        push: jest.fn()
    }
    wrapper = shallow(<EditExpensePage 
        expense = {expenses[0]}
        removeExpense =  {removeExpense}    
        editExpense = {editExpense}
        history = {history}
    />)
})

test('should render edit expense page ',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('on click simulate removeExpense', ()=>{
    wrapper.find('button').simulate('click');
    expect(removeExpense).toHaveBeenLastCalledWith(
       {id:expenses[0].id}
    );
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
})

test('onSubmit expenses', ()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpense).toHaveBeenLastCalledWith(
        expenses[0].id,
        expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard')
})