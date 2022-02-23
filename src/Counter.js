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

// N.B. dont use this function in production as there are undesireable edge cases
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  console.log(storage);
  if (storage) {
    return JSON.parse(storage);
  }
  return { count: 0 };
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
  console.log(localStorage);
}

document.title = 'Hello';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

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
      // Callback function will not except any arguments
      () => storeStateInLocalStorage(this.state)
      /*
      () => { 
        localStorage.setItem('counterState', JSON.stringify(this.state));
        console.log(localStorage);
      }
      */

    );

    console.log('Before!', this.state);
  }

  decrement() {
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count <= 0) {
          return;
          // Will work, but should really be more explicit here and return the value unchanged
          // return { count: state.count };
        }
        return { count: state.count - step };
      }, 
      // Callback function will not except any arguments
      () => storeStateInLocalStorage(this.state)
    );
  }

  reset() {
    this.setState({ count: 0 }, () => storeStateInLocalStorage(this.state));
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
