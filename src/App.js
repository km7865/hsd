import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Header from './components/Header';
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Store from "./components/Store";
import Agree from "./components/Agree";
import Mypage from "./components/Mypage";
import MenuDetail from "./components/MenuDetail";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:menuId" element={<MenuDetail/>} />
          <Route path="/store" element={<Store />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/signUp/:marketing" element={<SignUp />} />
          <Route path="/mypage/:userId" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;