import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router";
import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Products = lazy(() => import("./pages/Products").then((module) => ({ default: module.Products })));
const Blog = lazy(() => import("./pages/Blog").then((module) => ({ default: module.Blog })));
const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));
const Careers = lazy(() => import("./pages/Careers").then((module) => ({ default: module.Careers })));
const Login = lazy(() => import("./pages/Login").then((module) => ({ default: module.Login })));
const Signup = lazy(() => import("./pages/Signup").then((module) => ({ default: module.Signup })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((module) => ({ default: module.Dashboard })));

function PageLoader({ children }) {
  return <Suspense fallback={<div className="min-h-[60vh] bg-aw-navy text-white grid place-items-center">
    <div className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase">
      <span className="h-2 w-2 rounded-full bg-aw-green animate-pulse" />
      AmpereWalk
    </div>
  </div>}>{children}</Suspense>;
}

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthed = window.localStorage.getItem("amperewalk:session") === "active";

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <PageLoader><Login /></PageLoader>
  },
  {
    path: "/signup",
    element: <PageLoader><Signup /></PageLoader>
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <PageLoader><Home /></PageLoader> },
      { path: "about", element: <PageLoader><About /></PageLoader> },
      { path: "products", element: <PageLoader><Products /></PageLoader> },
      { path: "blog", element: <PageLoader><Blog /></PageLoader> },
      { path: "contact", element: <PageLoader><Contact /></PageLoader> },
      { path: "careers", element: <PageLoader><Careers /></PageLoader> },
      {
        path: "dashboard",
        element: <ProtectedRoute><PageLoader><Dashboard /></PageLoader></ProtectedRoute>
      },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);

export {
  router
};
