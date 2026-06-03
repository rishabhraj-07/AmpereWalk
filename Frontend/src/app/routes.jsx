import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useLocation } from "react-router";
import { Layout } from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import { useCareerAuth } from "./context/CareerAuthContext";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Products = lazy(() => import("./pages/Products").then((module) => ({ default: module.Products })));
const Blog = lazy(() => import("./pages/Blog").then((module) => ({ default: module.Blog })));
const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));
const Careers = lazy(() => import("./pages/Careers").then((module) => ({ default: module.Careers })));
const CareersJobDetail = lazy(() => import("./pages/CareersJobDetail").then((module) => ({ default: module.CareersJobDetail })));
const CareersApplicationForm = lazy(() => import("./pages/CareersApplicationForm").then((module) => ({ default: module.CareersApplicationForm })));
const CareersGeneralApplication = lazy(() => import("./pages/CareersGeneralApplication").then((module) => ({ default: module.CareersGeneralApplication })));
const CareersSignup = lazy(() => import("./pages/CareersSignup").then((module) => ({ default: module.CareersSignup })));
const CareersLogin = lazy(() => import("./pages/CareersLogin").then((module) => ({ default: module.CareersLogin })));
const CareersDashboard = lazy(() => import("./pages/CareersDashboard").then((module) => ({ default: module.CareersDashboard })));
const CareersApplicationSuccess = lazy(() => import("./pages/CareersApplicationSuccess").then((module) => ({ default: module.CareersApplicationSuccess })));
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
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <div className="min-h-[60vh] bg-aw-navy text-white grid place-items-center">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase">
          <span className="h-2 w-2 rounded-full bg-aw-green animate-pulse" />
          Loading session
        </div>
      </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function CareerProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isInitializing } = useCareerAuth();

  if (isInitializing) {
    return <div className="min-h-[60vh] bg-aw-navy text-white grid place-items-center">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase">
          <span className="h-2 w-2 rounded-full bg-aw-green animate-pulse" />
          Loading session
        </div>
      </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/careers/login" replace state={{ from: location.pathname }} />;
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
    path: "/careers/login",
    element: <PageLoader><CareersLogin /></PageLoader>
  },
  {
    path: "/careers/signup",
    element: <PageLoader><CareersSignup /></PageLoader>
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
      { path: "careers/job/:jobId", element: <PageLoader><CareersJobDetail /></PageLoader> },
      { path: "careers/apply/:jobId", element: <CareerProtectedRoute><PageLoader><CareersApplicationForm /></PageLoader></CareerProtectedRoute> },
      { path: "careers/general-application", element: <CareerProtectedRoute><PageLoader><CareersGeneralApplication /></PageLoader></CareerProtectedRoute> },
      { path: "careers/dashboard", element: <CareerProtectedRoute><PageLoader><CareersDashboard /></PageLoader></CareerProtectedRoute> },
      { path: "careers/application-success", element: <CareerProtectedRoute><PageLoader><CareersApplicationSuccess /></PageLoader></CareerProtectedRoute> },
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
