import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./routes/Home";
import Calendar from "./routes/CalendarPage.jsx";
import Directory from "./routes/Directory";
import Course from "./routes/Course.jsx";
import Login from "./routes/Login.jsx";
import CreateAccount from "./routes/CreateAccount.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/create-account",
        element: <CreateAccount />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/course/:courseId", 
        element: <Course />,
    },    
    {
        path: "/calendar",
        element: <Calendar />,
    },
    {
        path: "/directory",
        element: <Directory />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
