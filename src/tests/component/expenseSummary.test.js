import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {ExpenseSummary} from '../../components/ExpenseSummary';

test('should render expense summary', ()=>{
    const wrapper = shallow(<ExpenseSummary
            expensesCount={1} expensesTotal={353}
        />);
    expect(wrapper).toMatchSnapshot();
})

test('should render expense summary with multiple expenses', ()=>{
    const wrapper = shallow(<ExpenseSummary
            expensesCount={23} expensesTotal={354353453}
        />);
    expect(wrapper).toMatchSnapshot();
})