import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{
  onClick(){
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }
  onSubmit(expense){
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
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
      return dispatch(removeExpense(data));
    },
    editExpense : (id, expense)  => {
      return dispatch(editExpense(id, expense));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
