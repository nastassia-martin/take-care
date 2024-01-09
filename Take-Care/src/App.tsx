//import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ParentProfilePage from "./pages/ParentProfile/ParentProfilePage";
import CreateTeacherProfile from "./components/Forms/CreateTeacherProfile";
import CreateFamilyProfile from "./components/Forms/CreateFamilyProfile";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import ChildProfilePage from "./pages/ChildProfile/ChildPage";
import TeacherProfilePage from "./pages/TeacherProfile/TeacherProfilePage";
import UserListPage from "./pages/UserList/UserListPage";
import ChildrenListPage from "./pages/ChildrenList/ChildrenListPage";
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage/UpdateUserProfilePage";
import UpdateTeacherProfilePage from "./pages/UpdateTeacherProfilePage/UpdateTeacherProfilePage";
import UpdateChildProfilePage from "./pages/UpdateChildProfilePage/UpdateChildProfilePage";

/**
 * @todo - set up routing for dashboard (teacher)
 */

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Guest Routes */}
        <Route />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/newFamilyProfile" element={<CreateFamilyProfile />} />
        <Route path="/newTeacherProfile" element={<CreateTeacherProfile />} />
        <Route path="/teachers/:id" element={<TeacherProfilePage />} />
        <Route
          path="/teachers/:id/update"
          element={<UpdateTeacherProfilePage />}
        />
        <Route path="/parents" element={<UserListPage />} />
        <Route path="/parents/:id" element={<ParentProfilePage />} />
        <Route path="/parents/:id/update" element={<UpdateUserProfilePage />} />
        <Route path="/children" element={<ChildrenListPage />} />
        <Route path="/children/:id" element={<ChildProfilePage />} />
        <Route
          path="/children/:id/update"
          element={<UpdateChildProfilePage />}
        />

        {/* Protected Routes */}
        <Route />
      </Routes>
    </>
  );
};

export default App;
