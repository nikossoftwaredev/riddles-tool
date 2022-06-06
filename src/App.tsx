import "react-perfect-scrollbar/dist/css/styles.css";
import { Stack } from "@mui/material";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RiddleTabs from "./components/RiddleTabs";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        margin: "0px",
      }}
    >
      <Stack width="350px" gap={1} alignItems="center">
        <Router>
          <Routes>
            <Route path="/:tabName" element={<RiddleTabs />}></Route>
            <Route path="*" element={<Navigate to="/search" />}></Route>
          </Routes>
        </Router>
      </Stack>
    </div>
  );
};

export default App;
