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
import RegisterUserPage from './register/pages/RegisterUserPage.jsx';
import EditUserPage from './register/pages/EditUserPage.jsx';

const App = () => {
  // Add New User
  //define function addUser here
  //if a Post method send to /api/users 
  //then res ponse is a http response,
  //whith headre, and body of newUser in json format
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
        
        {/* 
        <Route path="/login" element = {<Login/>}/> 
        */}
        <Route path='/users' element={<UsersPage />} />
        <Route path='/register' element={<RegisterUserPage addUserSubmit={addUser} />} />
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
