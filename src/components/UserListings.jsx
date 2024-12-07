import { useState, useEffect } from 'react';
import UserListing from './UserListing';
import Spinner from './Spinner';

const UserListings = ({ isHome = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = isHome ? '/api/users?_limit=3' : '/api/users';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Users' : 'Browse Users'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {users.map((user) => (
              <UserListing key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default UserListings;
