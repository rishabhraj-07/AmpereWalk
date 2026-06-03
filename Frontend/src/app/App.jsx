import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ExperienceLayer } from "./components/ExperienceLayer";
import { AuthProvider } from "./context/AuthContext";
import { CareerAuthProvider } from "./context/CareerAuthContext";

function App() {
  return <>
    <ExperienceLayer />
    <AuthProvider>
      <CareerAuthProvider>
        <RouterProvider router={router} />
      </CareerAuthProvider>
    </AuthProvider>
  </>;
}
export {
  App as default
};
