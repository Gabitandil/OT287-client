import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Router>
    <App />
  </Router>,
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
