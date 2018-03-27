import React from 'react';
import { shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
let startRemoveExpense, editExpense, history, wrapper;
beforeEach(()=>{
    startRemoveExpense = jest.fn();
    editExpense = jest.fn();
    history = {
        push: jest.fn()
    }
    wrapper = shallow(<EditExpensePage 
        expense = {expenses[0]}
        removeExpense =  {startRemoveExpense}    
        editExpense = {editExpense}
        history = {history}
    />)
})

test('should render edit expense page ',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('on click simulate removeExpense', ()=>{
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(
       {id:expenses[0].id}
    );
    expect(history.push).toHaveBeenLastCalledWith('/');
     
})

test('onSubmit expenses', ()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpense).toHaveBeenLastCalledWith(
        expenses[0].id,
        expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/')
})