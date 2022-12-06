import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/Teachers';
import AssignTo from './pages/AssignTo';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Questions from './pages/Questions'
import PreviousYearPapers from './pages/PreviousYearPapers';
import Master from './pages/Master';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'teachers', element: <DashboardApp /> },
        { path: 'master', element: <Master /> },
        { path: 'teachers', element: <User /> },
        { path: 'students', element: <Students /> },
        { path: 'questions', element: <Questions /> },
        { path: 'assignTo', element: <AssignTo /> },
        { path: 'courses', element: <Courses /> },
        { path: 'previousYearPapers', element: <PreviousYearPapers /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/teachers" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}
