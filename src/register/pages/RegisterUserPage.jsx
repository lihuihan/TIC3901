import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/register.css';

/*
* user register table
* username
* useremail
* password(need to encrypt)
* created_at
* */

const RegisterUserPage = ({ registerUserSubmit }) => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email
    };

    addUserSubmit(newUser);

    toast.success('User Added Successfully');

    return navigate('/users');
  };

  return (
      <section className='bg-indigo-50'>
        <div className='container'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border'>
            <form onSubmit={submitForm}>
              <h2 className='text-3xl text-center font-semibold mb-6'>Register</h2>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  User Name
                </label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    className='w-full py-2 px-3 border rounded'
                    placeholder='Enter Your Name'
                    required
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Pass word
                </label>
                <input
                    type='text'
                    id='password'
                    name='password'
                    className='w-full py-2 px-3 border rounded'
                    placeholder='Enter Your Password'
                    required
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                    htmlFor='contact_email'
                    className='block text-gray-700 font-bold mb-2'
                >
                  Contact Email
                </label>
                <input
                    type='email'
                    id='contact_email'
                    name='contact_email'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Email address '
                    required
                    value={email}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>


              <div>
                <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
};
export default RegisterUserPage;
