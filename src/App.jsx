import './App.css'
import { Routes, Route } from "react-router";
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import AddTeacher from './pages/teacher/Add';
import AddCourse from './pages/course/Add';
import AddClassroom from './pages/classroom/Add';
import ClassRoomList from './pages/classroom/List';
import TeachersList from './pages/teacher/List';
import CourseList from './pages/course/List';
import ProtectedRoute from './components/ProtectedRoute';
import DepartmentList from './pages/faculty/List';
import AddDepartment from './pages/faculty/Add';
import TableList from './pages/table/List';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Faculty routes */}
        <Route
          path="/department/new"
          element={
            <ProtectedRoute>
              <AddDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department/list"
          element={
            <ProtectedRoute>
              <DepartmentList />
            </ProtectedRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path="/teacher/new"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/list"
          element={
            <ProtectedRoute>
              <TeachersList />
            </ProtectedRoute>
          }
        />

        {/* Course routes */}
        <Route
          path="/course/new"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/list"
          element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          }
        />

        {/* Classroom routes */}
        <Route
          path="/classroom/new"
          element={
            <ProtectedRoute>
              <AddClassroom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom/list"
          element={
            <ProtectedRoute>
              <ClassRoomList />
            </ProtectedRoute>
          }
        />
        {/* Table route */}
        <Route
          path="/table"
          element={
            <ProtectedRoute>
              <TableList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
