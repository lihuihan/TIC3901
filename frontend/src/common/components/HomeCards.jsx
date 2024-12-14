import { Link } from 'react-router-dom';
import Card from './Card.jsx';

const HomeCards = () => {
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card>
            <h2 className='text-2xl font-bold'>Some Title here</h2>
            <p className='mt-2 mb-4'>
              some descriptions here
            </p>
            <Link
              to='/users'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Browse Users
            </Link>
          </Card>
          <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>Some Other Title here</h2>
            <p className='mt-2 mb-4'>
              some descriptions here
            </p>
            <Link
              to='/register'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Register
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
