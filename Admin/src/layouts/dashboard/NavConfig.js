// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'teachers',
    path: '/teachers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'students',
    path: '/students',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Questions',
    path: '/questions',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Previous Year Papers',
    path: '/previousYearPapers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Courses',
    path: '/courses',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Assign To',
    path: '/assignTo',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
