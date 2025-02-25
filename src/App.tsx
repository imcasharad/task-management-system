import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import GroupPage from "./pages/group/GroupPage";
import { ThemeProvider } from "./store/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/groups" element={<GroupPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;