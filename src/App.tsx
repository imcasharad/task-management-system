import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./pages";
import { ThemeProvider } from "./store/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Router>
          <Routes>
          {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;