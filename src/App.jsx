import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";
import MessageDetails from "./pages/MessageDetails/MessageDetails"
import AdvanceSearch from "./pages/AdvanceSearch/AdvanceSearch"
import Root from "./components/Root/Root"
function App() {
    const router = createBrowserRouter([  
      {
        path:"/",
        element:<Root/>,
       
        children:[
          {
            index : true,
            element:<Home/>,
          },
          {
            path:"/message-details/:messageid",
            element: <MessageDetails/>, 
          },
          {
            path: "/advance-search",
            element: <AdvanceSearch/> 
          }
        ]
      }


    ]);

  return <RouterProvider router={router} />;
  
}

export default App
