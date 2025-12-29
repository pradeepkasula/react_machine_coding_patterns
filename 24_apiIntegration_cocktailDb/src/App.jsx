// This file sets up the routing for the entire application using React Router.
// It defines the routes and renders the RouterProvider to handle navigation.

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Importing page components that will be rendered at different routes.
import { HomeLayout, Landing, Cocktail, About } from './pages';

// Creating a browser router instance with route definitions.
// The router is an array of route objects, allowing nested routes.
const router = createBrowserRouter([
  {
    // Root path '/'
    path: '/',
    // HomeLayout is the parent element that wraps all child routes.
    // It provides a common layout (e.g., navbar) for the home section.
    element: <HomeLayout />,
    // Nested child routes under the root.
    children: [
      {
        // Index route: renders when exactly at '/'
        index: true,
        // Landing page is the default child, showing the search form and cocktail list.
        element: <Landing />,
      },
      {
        // Dynamic route for individual cocktails: '/cocktail/:id' (e.g., '/cocktail/11022')
        path: 'cocktail/:id',
        // Renders the Cocktail component for details of a specific cocktail.
        element: <Cocktail />,
      },
      {
        // Static route for about page: '/about'
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

// Main App component that provides the router to the application.
const App = () => {
  // Returns the RouterProvider, which makes the routing available to the app.
  // Example: When the app loads at '/', it renders HomeLayout with Landing as the child.
  // Input: Browser URL changes (e.g., user navigates to '/cocktail/123').
  // Output: React Router matches the route and renders the corresponding element (e.g., Cocktail component).
  return <RouterProvider router={router} />;
};

export default App;
