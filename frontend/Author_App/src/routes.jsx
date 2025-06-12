import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Manage from "./pages/Manage";
import EditPost from "./pages/EditPost";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = ()=> {
    const routes = [
        {
            path: '/',
            element:<MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path:'',
                    element: <Home />
                },
                {
                    path:'login',
                    element: <Login />
                },
                {
                    path:'register',
                    element: <Register/>
                },
                {
                    path: 'create',
                    element: <Create />
                },
                {
                    path:'manage',
                    element: <Manage />,
                        
                }
                ,{
                            path:'editpost/:id',
                            element: <EditPost />
                        }
            ]

        }
    ]
    return routes;
};

export default AppRoutes;