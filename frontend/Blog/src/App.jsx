import './App.css'
import AppRoutes from './routes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {



  return (
    <div className="App">
      <Routes />
    </div>
  );
}
function Routes() {
  const router = createBrowserRouter(AppRoutes()); // `useAuth` is safe to use here
  return <RouterProvider router={router} />;
}

export default App
