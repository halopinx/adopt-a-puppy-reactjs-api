import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import PuppyProfilePage from "./pages/PuppyProfile";
import PuppyListPage from "./pages/PuppyList";


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':id', element: <PuppyProfilePage /> },
      { path: 'find-your-puppy', element: <PuppyListPage /> },
    ]}
])

const App = () => {
  return (  
      <RouterProvider router={router}/>
  );
}
 
export default App;
