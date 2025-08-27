import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import Users from "./components/Users/Users";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <>
      <header className="home">
        <Navbar />
      </header>
      <main>
        <Posts />
        <Users />
        <Products/>
      </main>
      <Footer />
    </>
  );
};

export default App;
