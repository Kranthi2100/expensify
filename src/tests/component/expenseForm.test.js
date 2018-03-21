import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render Expense Form with default data',()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
})

test('should render Expense Form with props',()=>{
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
})

test('should render error when data is invalid', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault : ()=>{}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = "netflix";
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    })
    expect(wrapper.state('description')).toBe(value)
    
})

test('should a note text area change', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = 'entertainment'
    wrapper.find('textarea').at(0).simulate('change',{
        target:{value}
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount when valid data is passed', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.24";
    wrapper.find('input').at(1).simulate('change',{
        target:{value}
    })
    expect(wrapper.state('amount')).toBe("12.24")
})

test('should set amount when valid data is passed', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    const value = "12.245";
    wrapper.find('input').at(1).simulate('change',{
        target:{value}
    })
    expect(wrapper.state('amount')).toBe("")
})

test('should call onSublmit when submit',()=>{
    const submit = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit = {submit}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault: ()=>{}
    });
    expect(wrapper.state('error')).toBe('');
    expect(submit).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    })
})

test('should set createdAt value', ()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toBe(now);
})

test('should set calender focus value', ()=>{
    const focused = true;
    const now = moment();
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
})