import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage, CreateConfigPage, UpdateConfigPage } from "./pages/export";

import { View_table } from "./z.TEST.z/export";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/'} element={ <HomePage /> } />
          <Route path={'/createconfig'} element={ <CreateConfigPage /> } />
          <Route path={'/updateconfig'} element={ <UpdateConfigPage /> } />
          <Route path={'/test/table'} element={ <View_table /> } />
      </Routes>
    </div>
  );
}

export default App;
