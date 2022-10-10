import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthPage } from "./pages/AuthPage";
import { ContactsList } from "./pages/ContactsPage";
import { MainPage } from "./pages/MainPage";
import { getUsersAuthStatus } from "./store/slices/authSlice";
function App() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto pt-4">
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute
                redirectPath="/auth"
                isAuthenticated={useSelector(getUsersAuthStatus())}
              >
                <ContactsList />
              </ProtectedRoute>
            }
          />
          <Route path={"/auth"} element={<AuthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
