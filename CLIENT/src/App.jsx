import { Route, Routes } from "react-router";
import MainPage from "./components/page/MainPage/MainPage";
import Layout from "./components/widgets/Layout";
import LoginPage from "./components/page/LoginPage";
import SignInPage from "./components/page/SigninPage";
import { useEffect, useState } from "react";
import axiosInstance, {setAccessToken} from "./components/shared/lib/axiosInstance";
import OneRecieptCard from "./components/widgets/OneRecieptCard"
import FavoritesPage from "./components/page/FavoritesPage";

function App() {
  const [user, setUser] = useState({ status: 'logging', data: null });
  const handleLogout = () => {
    axiosInstance
      .get('/auth/logout')
      .then(() => setUser({ status: 'guest', data: null }));
    setAccessToken('');
  };

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: 'logged', data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);
  return (
    <Routes>
      <Route element={<Layout user={user} handleLogout={handleLogout} />}>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/signup" element={<LoginPage setUser={setUser} />} />
        <Route path="/signin" element={<SignInPage setUser={setUser} />} />
      <Route path='/:id' element={<OneRecieptCard />} />
        <Route
          path="/favorites"
          element={<FavoritesPage user={user} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
