import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Loginscreen from './loginscreen/Loginscreen';
import Registerscreen from './registerscreen/Registerscreen';
import Home from './home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />}>
          </Route>
          <Route path="/login" element={<Loginscreen />}>
          </Route>
          <Route path="/register" element={<Registerscreen />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
