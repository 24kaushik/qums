import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Navbar from "@/components/navbar.tsx";
import Home from "@/pages/Home.tsx";
import Footer from "./components/footer.tsx";
import RegProvider from "./context/RegContext.tsx";

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar, footer on all pages except login */}
      {location.pathname !== "/" && <Navbar />}
      {children}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RegProvider>
        <AppLayout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AppLayout>
      </RegProvider>
    </BrowserRouter>
  );
}
