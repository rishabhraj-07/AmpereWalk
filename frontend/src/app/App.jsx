import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ExperienceLayer } from "./components/ExperienceLayer";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return <>
    <ExperienceLayer />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>;
}
export {
  App as default
};
