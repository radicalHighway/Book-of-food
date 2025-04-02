import { Route, Routes } from "react-router";
import MainPage from "./components/page/MainPage";
import Layout from "./components/widgets/Layout";
import OneRecieptCard from "./components/widgets/OneRecieptCard"


function App() {
  return (
    <Routes>
      <Route element={<Layout/>} >
      <Route path='/' element={<MainPage />} />
      <Route path='/:id' element={<OneRecieptCard />} />
      </Route>
    </Routes>
  );
}

export default App;
