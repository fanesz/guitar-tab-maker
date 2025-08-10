import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Debugger from "@components/Debugger";
import TabMakerPage from "@pages/TabMaker";
// import Navbar from "@components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Navigate to="/tab-maker" replace />} />
          <Route path="/tab-maker" element={<TabMakerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function BaseLayout() {
  return (
    <div className="min-h-screen flex flex-col w-screen overflow-x-hidden">
      <header>
        <div className="w-screen">{/* <Navbar /> */}</div>
      </header>
      <main className="flex-grow">
        <div className="w-screen">
          <Outlet />
        </div>
        <Debugger />
      </main>
      <footer>
        <div className="w-screen">{/* <Footer /> */}</div>
      </footer>
    </div>
  );
}
