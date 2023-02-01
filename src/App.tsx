import "react-perfect-scrollbar/dist/css/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RiddleTabs from "./components/RiddleTabs";

const App = () => (
  <Router>
    <Routes>
      <Route path="/:tabName" element={<RiddleTabs />}></Route>
      <Route path="*" element={<Navigate to="/search" />}></Route>
    </Routes>
  </Router>
);

export default App;
