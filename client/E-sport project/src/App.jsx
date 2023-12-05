import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      // children: [
      //   {
      //     index: true,
      //     element: <Dashboard />
      //   },
      // {
      //   path: "Favorites",
      //   element: <Favorites />
      // },
      // {
      //   path: "Forecast",
      //   element: <Forecast />
      // },
      // {
      //   path: "SignIn",
      //   element: <SignIn />
      // }
      // ]
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
