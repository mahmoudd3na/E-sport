import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Results from './pages/Results';
import TourDetails from './pages/TourDetails';
import CreateTour from './pages/CreateTour';
import Register from './pages/Register';
import UserProfile from './components/UserProfile';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "Tournaments",
          element: <Tournaments />,
        },
        {
          path: "Results",
          element: <Results />
        },
        {
          path: "Tournaments/:id",
          element: <TourDetails />
        },
        {
          path: "Create",
          element: <CreateTour />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }, {
          path: "users/:id",
          element: <UserProfile />
        }

      ]
    },
  ])

  return (

    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
