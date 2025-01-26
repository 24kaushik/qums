import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Navbar from "@/components/navbar.tsx";
import Home from "@/pages/Home.tsx";

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar on all pages except login */}
      {location.pathname !== "/login" && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}