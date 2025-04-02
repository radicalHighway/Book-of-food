import { Route, Routes } from "react-router";
import MainPage from "./components/page/MainPage";
import Layout from "./components/widgets/Layout";


function App() {
  return (
    <Routes>
      <Route element={<Layout/>} >
      <Route path='/' element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
