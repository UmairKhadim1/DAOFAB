import { Routes, Route } from "react-router-dom"; // Importing the `Routes` and `Route` components from the `react-router-dom` library
import ParentTransactions from "./components/parentTransactions"; // Importing the `ParentTransactions` component
import ChildTransactions from "./components/childTransactions"; // Importing the `ChildTransactions` component

function App() {
  return (
    <div>
      {/* Defining routes */}
      <Routes>
        {" "}
        {/* Defining a set of routes for the application */}
        <Route path="/" element={<ParentTransactions />} />{" "}
        {/* Defining a route for the parent transactions page */}
        <Route path="/childtransactions" element={<ChildTransactions />} />{" "}
        {/* Defining a route for the child transactions page */}
      </Routes>
    </div>
  );
}

export default App; // Exporting the `App` component for use in other parts of the application
