import React from 'react';
import "shared/styles/app.scss"
import { Route, Routes, Navigate } from 'react-router-dom';
import { Main } from 'pages';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path='/:id' element={<Main />} />
        <Route path='*' element={
          <Navigate to={`z${(+new Date).toString(16)}`} />
        }>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
