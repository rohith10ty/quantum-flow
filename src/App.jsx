import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SmoothScroll from "./components/SmoothScroll";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Work from "./pages/Work";
import Board from "./pages/Board";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Assets from "./pages/Assets";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />

      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/work" element={<Work />} />

        <Route path="/board" element={<Board />} />

        <Route path="/create" element={<CreateIssue />} />

        <Route path="/issue/:issueId" element={<IssueDetails />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/assets" element={<Assets />} />

        <Route path="/integrations" element={<Integrations />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
