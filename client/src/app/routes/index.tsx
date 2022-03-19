import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "features/auth/Login";
import Register from "features/auth/Register";
import RequireAuth from "./RequireAuth";
import Unauth from "./Unauth";
import Dashboard from "features/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<Unauth />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
