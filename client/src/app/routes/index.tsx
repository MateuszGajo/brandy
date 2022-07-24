import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "features/auth/Login";
import Register from "features/auth/Register";
import Unauth from "./Unauth";
import Dashboard from "features/Activities/Dashboard";
import Activity from "features/Activities/Details";
import RequireAuth from "./RequireAuth";
import ActivityForm from "features/Activities/Form";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route element={<RequireAuth />}>
          <Route path="/activity/add" element={<ActivityForm />} />
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
