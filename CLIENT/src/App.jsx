import { Route, Routes } from "react-router";
import MainPage from "./components/page/MainPage/MainPage";
import Layout from "./components/widgets/Layout";
import LoginPage from "./components/page/LoginPage";
import SignInPage from "./components/page/SigninPage";
import { useEffect, useState } from "react";
import axiosInstance, {
  setAccessToken,
} from "./components/shared/lib/axiosInstance";
import OneRecieptCard from "./components/widgets/RecieptCard/OneRecieptCard/OneRecieptCard";
import FavoritesPage from "./components/page/FavoritesPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AuthRoute from "./components/utils/AuthRoute";
import BasicExample from "./components/utils/Spinner";

function App() {
  const [user, setUser] = useState({ status: "logging", data: null }); // не авторизован
  const isLoading = user.status === "logging";
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useState({});

  const updateFavoritesCount = async () => {
    if (user.status === "logged") {
      try {
        const { data } = await axiosInstance.get(
          `/favorites/users/${user.data.id}/likes`
        );
        setCount(data.length);
      } catch (error) {
        console.error("Error updating favorites count:", error);
      }
    }
  };

  const countHandler = (id) => {
    setFavorites((prev) => {
      const newFavorites = { ...prev, [id]: !prev[id] };
      setCount(Object.values(newFavorites).filter(Boolean).length);
      return newFavorites;
    });
  };

  const handleLogout = () => {
    axiosInstance
      .get("/auth/logout")
      .then(() => setUser({ status: "guest", data: null }));
    setAccessToken("");
  };

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: "logged", data: data.user }); //  авторизован
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  return (
    <BasicExample isLoading={isLoading}>
      <Routes>
        <Route
          element={
            <Layout user={user} handleLogout={handleLogout} count={count} />
          }
        >
          <Route
            path="/"
            element={<MainPage countHandler={countHandler} user={user} />}
          />
          <Route
            path="/signup"
            element={
              <AuthRoute user={user} redirectTo="/">
                <LoginPage setUser={setUser} />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute user={user} redirectTo="/">
                <SignInPage setUser={setUser} />
              </AuthRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <ProtectedRoute user={user} redirectTo="/signin">
                <OneRecieptCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute user={user} redirectTo="/signin">
                <FavoritesPage
                  updateFavoritesCount={updateFavoritesCount}
                  user={user}
                />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BasicExample>
  );
}

export default App;
