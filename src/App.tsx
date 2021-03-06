import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import Alert from "./components/layout/Alert";
import { GithubProvider } from "./context/github/githubContext";
import { AlertProvider } from "./context/alert/alertContext";
import User from "./pages/User";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <NavBar></NavBar>
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer></Footer>
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
