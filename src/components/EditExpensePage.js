import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{
  onClick(){
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/dashboard');
  }
  onSubmit(expense){
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/dashboard');
  }
  render(){
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={ this.onSubmit.bind(this) } 
        />
        <button onClick={ this.onClick.bind(this) }>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    removeExpense : (data) =>{
      return dispatch(startRemoveExpense(data));
    },
    editExpense : (id, expense)  => {
      return dispatch(startEditExpense(id, expense));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
