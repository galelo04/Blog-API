import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Posts from "./pages/Posts";

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
                    path: 'posts',
                    element: <Posts />
                },
                {
                    path:'post/:id',
                    element: <Post />,
                        
                }
            ]

        }
    ]
    return routes;
};

export default AppRoutes;