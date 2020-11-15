import React from "react";
import Search from "./components/Search";
import Nav from "./components/Nav";
import Table from "./components/Table";
import "./App.css";



function App() {
  return (
    <div className="container">
     < Nav />
     {/* < Search /> */}
     < Table />
    </div>
  );
}

export default App;
