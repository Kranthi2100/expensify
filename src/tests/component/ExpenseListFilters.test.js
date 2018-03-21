import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { wrap } from 'module';
import moment from 'moment';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        filters={filters}
    />);
})

test('should render expense list filters', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render correctly when alt filters are passed', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
})

test('should update state.filters.text on change', () => {
    const value = 'milkshake';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should call dispatch with sort by date', () => {
    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled();
})

test('should call dispatch with sort by date', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled();
})

test('should handle date change', () => {
    const startDate = moment(0), endDate = moment(0).add(1, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate,
        endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

test('should handle on focus change', () => {
    const isFocused="startDate";
    wrapper.find('DateRangePicker').prop('onFocusChange')(isFocused);
    expect(wrapper.state('calendarFocused')).toBe(isFocused);
})