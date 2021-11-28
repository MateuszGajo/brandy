import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "features/views/Signin";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
