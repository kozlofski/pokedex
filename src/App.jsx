import Home from "./components/subpages/Home.styled"
import SignUp from "./components/subpages/SignUp.styled"
import LogIn from "./components/subpages/LogIn.styled"
import Favorites from "./components/subpages/Favorites.styled"
import Arena from "./components/subpages/Arena.styled"
import Ranking from "./components/subpages/Ranking.styled"
import Edit from "./components/subpages/Edit.styled"
import NotFound from "./components/subpages/NotFound.styled"
import Layout from "./components/subpages/Layout.styled"
import Navbar from "./components/subpages/Navbar.styled"

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

const router = createBrowserRouter([
  { element: <Home />, path: "/" },
  { element: <SignUp />, path: "sign-up" },
  { element: <LogIn />, path: "log-in" },
  { element: <Favorites />, path: "favorites" },
  { element: <Arena />, path: "arena" },
  { element: <Ranking />, path: "ranking" },
  { element: <Edit />, path: "edit" },
  { element: <NotFound />, path: "*" },
])

const App = () => {

  return (
    <Layout>
      <Navbar />
      <RouterProvider router={router} />
    </Layout >
  )
}

export default App
