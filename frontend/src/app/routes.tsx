import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Careers } from "./pages/Careers";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "products", Component: Products },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "careers", Component: Careers },
      { path: "login", Component: Login },
      { path: "dashboard", Component: Dashboard },
    ],
  },
]);
