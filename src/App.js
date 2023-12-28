import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CurrencyPage from "./pages/CurrencyPage";
import NotificationBar from "./components/NotificationBar";
import UnitsPage from "./pages/UnitsPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <div className="md:flex md:justify-center md:items-center md:h-screen dark:bg-neutral-dark">
      <div className="hidden md:absolute md:top-0 md:block md:w-full md:h-full waves"></div>
      <div className="z-10 flex flex-col h-screen overflow-hidden md:justify-center md:p-4">
        <NavBar />
        <Routes>
          <Route path="/" element={<CurrencyPage />} />
          <Route path="/units/*" element={<UnitsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        <NotificationBar />
      </div>
    </div>
  );
}

export default App;
