import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let onSubmit, history, wrapper;
beforeEach(()=>{
    onSubmit = jest.fn();
    history = {
        push : jest.fn()
    }

    wrapper = shallow(<AddExpensePage 
            onSubmit={onSubmit}
            history = {history}    
        />);
})


test('should render AddExpensePage correctly', ()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should handle on submit',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenLastCalledWith('/dashboard')
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[0])
})