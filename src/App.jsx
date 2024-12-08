import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './common/pages/HomePage.jsx';
import UsersPage from './common/pages/UsersPage.jsx';
import NotFoundPage from './common/pages/NotFoundPage.jsx';
import UserPage, { userLoader } from './common/pages/UserPage.jsx';
import AddUserPage from './register/pages/AddUserPage.jsx';
import EditUserPage from './register/pages/EditUserPage.jsx';

const App = () => {
  // Add New User
  const addUser = async (newUser) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    return;
  };

  // Delete User
  const deleteUser = async (id) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update User
  const updateUser = async (user) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/add-user' element={<AddUserPage addUserSubmit={addUser} />} />
        <Route
          path='/edit-user/:id'
          element={<EditUserPage updateUserSubmit={updateUser} />}
          loader={userLoader}
        />
        <Route
          path='/users/:id'
          element={<UserPage deleteUser={deleteUser} />}
          loader={userLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
