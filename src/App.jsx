import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";
import MessageDetails from "./pages/MessageDetails/MessageDetails"
import AdvanceSearch from "./pages/AdvanceSearch/AdvanceSearch"
import Root from "./components/Root/Root"
import HeaderProvider from './assets/context/HeaderProvider';
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

        ]
      }


    ]);

  return (
    <HeaderProvider>
       <RouterProvider router={router} />
    </HeaderProvider>
  );
  
}

export default App
