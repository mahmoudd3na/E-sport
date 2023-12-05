import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Leaderboard from './pages/Leaderboard';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "Tournaments",
          element: <Tournaments />
        },
        {
          path: "Leaderboard",
          element: <Leaderboard />
        }
      ]
    }, {
      path: "/login",
      element: <Login />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
