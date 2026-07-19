
import Card from "./components/Card"
import Button from "./components/Button"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import { users } from "./Users.js"
import User from "./User.jsx"
import Chat from "./Chat.jsx"
import Counter from "./Counter.jsx"
import Students from "./Students.jsx"
import NotFound from "./NotFound.jsx"
import Home from "./pages/Home.jsx"
import "./App.css"
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"
import Layout from "./Layout.jsx"
import Transaction from "./pages/Transaction.jsx"
import Transfer from "./pages/Transfer.jsx"
import { UsercontextProvider } from "./context/UserContext.jsx"
import ProtectedPage from "./ProtectedPage.jsx"
function App() {
  return (
    <BrowserRouter>
    <UsercontextProvider>

<Routes>
  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected routes */}
  <Route element={<ProtectedPage />}>
    <Route path="/transfer" element={<Transfer />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="transaction" element={<Transaction />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
      </UsercontextProvider>
    </BrowserRouter>
  )


}

export default App
