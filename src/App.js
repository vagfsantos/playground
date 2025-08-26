import { ListDefinitions } from "./01-ListDefinitions/ListDefinitions";
import { BrowserRouter, Routes, Route } from "react-router";
import { CEPAddress } from "./02-CEPAddress/CEPAddress";

function App() {
  return (
    <div className="App">
      <h1>Playground</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/01" Component={ListDefinitions} />
          <Route path="/02" Component={CEPAddress} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
