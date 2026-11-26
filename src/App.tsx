import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthProvider from "./contexts/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import LocationDetailPage from "./pages/LocationDetailPage"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>

            <Route element={<ProtectedRoute />}>
              <Route path="/location/:id" element={<LocationDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </Navbar>
      </AuthProvider>
    </>
  )
}

export default App
