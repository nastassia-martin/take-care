import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ParentProfilePage from "./pages/ParentProfile/ParentProfilePage";
import CreateTeacherProfile from "./components/Forms/CreateTeacherProfile";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import ChildProfilePage from "./pages/ChildProfile/ChildPage";
import TeacherProfilePage from "./pages/TeacherProfile/TeacherProfilePage";
import UserListPage from "./pages/UserList/UserListPage";
import ChildrenListPage from "./pages/ChildrenList/ChildrenListPage";
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage/UpdateUserProfilePage";
import UpdateTeacherProfilePage from "./pages/UpdateTeacherProfilePage/UpdateTeacherProfilePage";
import UpdateChildProfilePage from "./pages/UpdateChildProfilePage/UpdateChildProfilePage";
import CreatePostPage from "./pages/CreatePost/CreatePostPage";
import EditPost from "./components/Posts/EditPosts";
import RequireAuth from "./components/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * @todo - set up routing for dashboard (teacher)
 */

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Guest Routes */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/login" element={<LoginUserPage />} />

        {/* Protected Routes */}
        {/* /parents */}
        <Route path="/parents">
          <Route path="" element={<UserListPage />} />
          {/* /parents/:id */}
          <Route
            path=":id"
            element={
              <RequireAuth>
                <ParentProfilePage />
              </RequireAuth>
            }
          />
          {/* /parents/:id/update */}
          <Route
            path=":id/update"
            element={
              <RequireAuth>
                <UpdateUserProfilePage />
              </RequireAuth>
            }
          />
        </Route>

        {/* /teachers */}
        <Route path="/teachers">
          {/* /teachers/:id */}
          <Route
            path=":id"
            element={
              <RequireAuth>
                <TeacherProfilePage />
              </RequireAuth>
            }
          />
          {/* /teachers/:id/update */}
          <Route
            path=":id/update"
            element={
              <RequireAuth>
                <UpdateTeacherProfilePage />
              </RequireAuth>
            }
          />
        </Route>

        {/* /children */}
        <Route path="/children">
          <Route
            path=""
            element={
              <RequireAuth>
                <ChildrenListPage />
              </RequireAuth>
            }
          />
          {/* /children/:id */}
          <Route
            path=":id"
            element={
              <RequireAuth>
                <ChildProfilePage />
              </RequireAuth>
            }
          />
          {/* /children/:id/update */}
          <Route path=":id/update" element={<UpdateChildProfilePage />} />
        </Route>

        {/* /posts */}
        <Route path="/posts">
          <Route
            path=""
            element={
              <RequireAuth>
                <CreatePostPage />
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth>
                <EditPost />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="/newTeacherProfile"
          element={
            <RequireAuth>
              <CreateTeacherProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
