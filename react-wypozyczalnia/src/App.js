import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Loginscreen from './loginscreen/Loginscreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loginscreen />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;