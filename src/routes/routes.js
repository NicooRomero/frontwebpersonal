//Layouts
import LayoutWeb from '../layouts/LayoutWeb';
import LayoutAdmin from '../layouts/LayoutAdmin';

//Admin Pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/Menu';
import AdminCourses from '../pages/Admin/Courses.js';
import AdminBlog from '../pages/Admin/Blog';


//Pages
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import Skills from '../pages/Skills';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';

//Error404
import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/cursos",
                component: AdminCourses,
                exact: true
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutWeb,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/portfolio",
                component: Portfolio,
                exact: true
            },
            {
                path: "/skills",
                component: Skills,
                exact: true
            },
            {
                path: "/blog",
                component: Blog,
                exact: true
            },
            {
                path: "/:url",
                component: Blog,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            } 
        ]
    }
];

export default routes;