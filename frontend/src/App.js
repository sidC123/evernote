import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./Components/MyNotes";
import LoginScreen from "./Components/LoginScreen";
import RegisterScreen from "./Components/RegisterScreen";
import CreateNote from "./Components/CreateNote";
import SingleNote from "./Components/SingleNote";
import { useState } from "react";
import ProfileScreen from "./Components/ProfileScreen";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/mynotes/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
