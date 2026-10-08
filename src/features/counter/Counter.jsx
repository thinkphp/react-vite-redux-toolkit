import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

export default function Counter() {
  // 1. useSelector extracts state from the Redux store
  const count = useSelector((state) => state.counter.value);

  // 2. useDispatch provides a way to dispatch actions to the store
  const dispatch = useDispatch();

  // Local component state for custom input
  const [customAmount, setCustomAmount] = useState('5');

  const handleCustomAdd = (e) => {
    e.preventDefault();
    const amount = Number(customAmount) || 0;
    dispatch(incrementByAmount(amount));
  };

  return (
    <section className="card counter-card">
      <div className="card-header">
        <h2>1. Simple Example: Counter</h2>
        <span className="card-tag">Primitive State</span>
      </div>
      <p className="card-desc">
        Demonstrates reading a value from the store using <code>useSelector</code> and updating it via <code>useDispatch</code>.
      </p>

      <div className="counter-display">
        <span className="count-label">Current Store Value:</span>
        <span className="count-value">{count}</span>
      </div>

      <div className="button-group">
        <button
          onClick={() => dispatch(decrement())}
          className="btn btn-secondary"
          title="Decrement by 1"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="btn btn-primary"
          title="Increment by 1"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="btn btn-outline"
          title="Reset to 0"
        >
          Reset (0)
        </button>
      </div>

      <form onSubmit={handleCustomAdd} className="custom-amount-form">
        <label htmlFor="custom-amount">Add a specific amount:</label>
        <div className="input-group">
          <input
            id="custom-amount"
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="input-field"
            placeholder="Amount"
          />
          <button type="submit" className="btn btn-accent">
            Add +{customAmount || 0}
          </button>
        </div>
      </form>
    </section>
  );
}
