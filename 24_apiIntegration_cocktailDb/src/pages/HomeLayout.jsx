// This component serves as the layout wrapper for the home routes.
// It includes a navbar, handles page loading states, and renders child routes via Outlet.

import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  // Hook to get the current navigation state (e.g., 'idle', 'loading', 'submitting').
  const navigation = useNavigation();

  // Checks if the app is currently loading a new route.
  // Example: When navigating from '/' to '/cocktail/123', navigation.state becomes 'loading' temporarily.
  const isPageLoading = navigation.state === 'loading';

  // Defining a context value to pass down to child components via Outlet's context.
  // This value can be accessed in child routes using useOutletContext().
  // Example: value = 'some value' – children can read this as context.value.
  // Input: None (hardcoded here).
  // Output: Passed to Outlet, available in descendants.
  const value = 'some value';
  return (
    <>
      {/* Rendering the Navbar at the top of the layout. */}
      <Navbar />
      {/* Main content section with class 'page'. */}
      <section className='page'>
        {/* Conditional rendering: Show loading spinner if page is loading, else render child route. */}
        {isPageLoading ? (
          <div className='loading' /> // Simple loading indicator (likely a spinner via CSS).
        ) : (
          // Outlet renders the matched child route (e.g., Landing, Cocktail).
          // Passes context to children for shared data.
          // Example: At '/', Outlet renders <Landing /> and provides { value: 'some value' }.
          // Input: Child route element.
          // Output: Rendered child component with access to context.
          <Outlet context={{ value }} />
        )}
      </section>
    </>
  );
};
export default HomeLayout;
