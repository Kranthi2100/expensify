import React from 'react';
import getExpensesTotal from '../selectors/getExpensesTotal';
import numeral from 'numeral';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
export const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formatedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <h1>viewing {expensesCount} {expenseWord} totalling {formatedExpensesTotal}</h1>
        </div>
    );
}

const mapStateToProps = (state)=>{
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expensesTotal : getExpensesTotal(visibleExpenses),
        expensesCount : visibleExpenses.length
    }
}
export default connect(mapStateToProps)(ExpenseSummary);