import Home from "./components/subpages/Home.styled"
import SignUp from "./components/subpages/SignUp.styled"
import LogIn from "./components/subpages/LogIn.styled"
import Favorites from "./components/subpages/Favorites.styled"
import Arena from "./components/subpages/Arena.styled"
import Ranking from "./components/subpages/Ranking.styled"
import Edit from "./components/subpages/Edit.styled"
import LogOut from "./components/subpages/LogOut"
import NotFound from "./components/subpages/NotFound.styled"
import AppLayout from "./components/subpages/AppLayout.styled"

import "./css/reset.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GlobalContextProvider from "./context/GlobalContextProvider"
import LoginContextProvider from "./context/LoginContextProvider"

const router = createBrowserRouter([
  {
    element: <AppLayout />, path: "/", children: [
      { element: <Home />, path: "/" },
      { element: <LogIn />, path: "/log-in" },
      { element: <SignUp />, path: "/sign-up" },
      { element: <Favorites />, path: "/favorites" },
      { element: <Arena />, path: "/arena" },
      { element: <Ranking />, path: "/ranking" },
      { element: <Edit />, path: "/edit" },
      { element: <LogOut />, path: "/log-out" },
      { element: <NotFound />, path: "*" },
    ]
  },
])

const App = () => {
  return (
    <LoginContextProvider>
      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </LoginContextProvider>
  )
}

export default App
