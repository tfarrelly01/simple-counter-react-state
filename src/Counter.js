import React, { Component } from 'react';

/*
const increment = (state, props) => {
  const { max, step } = props;
  if (state.count >= max) {
    return;
    // Will work, but should really be more explicit here and return the value unchanged
    // return { count: state.count };
  }
  return { count: state.count + step };
};
*/

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    // N.B this,setState is asynchronous, Also this.setState will accept a function as an argument
    // and a second argument which is a callback function
    // this.setState(increment);
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) {
          return;
          // Will work, but should really be more explicit here and return the value unchanged
          // return { count: state.count };
        }
        return { count: state.count + step };
      }, 
      () => { 
        console.log('After!', this.state);
      }
    );

    console.log('Before!', this.state);
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    const { count } = this.state;

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </main>
    );
  }
}

export default Counter;
