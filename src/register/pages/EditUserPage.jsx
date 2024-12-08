import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/register.css';

const EditUserPage = ({ updateUserSubmit }) => {
  const user = useLoaderData();
  const [title, setTitle] = useState(user.title);
  const [type, setType] = useState(user.type);
  const [location, setLocation] = useState(user.location);
  const [description, setDescription] = useState(user.description);
  const [salary, setSalary] = useState(user.salary);
  const [companyName, setCompanyName] = useState(user.company.name);
  const [companyDescription, setCompanyDescription] = useState(
    user.company.description
  );
  const [contactEmail, setContactEmail] = useState(user.company.contactEmail);
  const [contactPhone, setContactPhone] = useState(user.company.contactPhone);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedUser = {
      id,
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    updateUserSubmit(updatedUser);

    toast.success('User Updated Successfully');

    return navigate(`/users/${id}`);
  };

  return (
      <section className='bg-indigo-50'>
        <div className='container'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border'>
            <form onSubmit={submitForm}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Update User
              </h2>

              {/* Similar form fields as AddUserPage */}

              <div className='mb-4'>
                <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
};
export default EditUserPage;
