import Home from "./components/subpages/Home"
import SignUp from "./components/subpages/SignUp"
import LogIn from "./components/subpages/LogIn"
import Favorites from "./components/subpages/Favorites"
import Arena from "./components/subpages/Arena"
import Ranking from "./components/subpages/Ranking"
import Edit from "./components/subpages/Edit"
import LogOut from "./components/subpages/LogOut"
import NotFound from "./components/subpages/NotFound"
import Forbidden from "./components/subpages/Forbidden"
import AppLayout from "./components/subpages/AppLayout"

import "./css/reset.css"
import "./css/App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GlobalContextProvider from "./context/GlobalContextProvider"
import LoginContextProvider from "./context/LoginContextProvider"
import { ThemeProvider } from "styled-components"
import { SnackbarProvider } from 'notistack'
import { light } from "./styles/theme"
import { useState } from "react"

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
      { element: <Forbidden />, path: "/forbidden" },
    ]
  },
])

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(light)

  return (
    <ThemeProvider theme={selectedTheme}>
      <LoginContextProvider>
        <SnackbarProvider preventDuplicate='true'>
          <GlobalContextProvider setSelectedTheme={setSelectedTheme}>
            <RouterProvider router={router} />
          </GlobalContextProvider>
        </SnackbarProvider>
      </LoginContextProvider>
    </ThemeProvider>
  )
}

export default App
