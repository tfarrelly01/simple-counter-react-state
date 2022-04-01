import React, { useState, useEffect } from 'react';

// N.B. dont use this function in production as there are undesireable edge cases
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  console.log(storage);
  if (storage) {
    return JSON.parse(storage).count;
  }
  return { count: 0 };
};

const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
  console.log(localStorage);
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage());

  // const increment = () => setCount(count + 1);

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  }

  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // useEffect 
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]); 
  // An array of dependancies , only run when sometimes I care about changes, similar to componentDidMount but there are other 
  // use cases when it need to run more than once
  // exhaustive depths - Eslint plugin 

  useEffect(() => {
    storeStateInLocalStorage(count);
  }, [count])

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  );
}

export default Counter;
