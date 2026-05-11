import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ExperienceLayer } from "./components/ExperienceLayer";
function App() {
  return <>
    <ExperienceLayer />
    <RouterProvider router={router} />
  </>;
}
export {
  App as default
};
