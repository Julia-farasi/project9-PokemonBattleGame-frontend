import { Route, Routes } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout.jsx";
import Home from "./pages/Home.jsx";
import BattlePage from "./pages/BattlePage.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import PokemonDetailsPage from "./pages/PokemonDetailsPage.jsx";
import MyRosterPage from "./pages/MyRosterPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="/roster" element={<MyRosterPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
