import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import UserListings from '../components/UserListings';
import ViewAllUsers from '../components/ViewAllUsers';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <UserListings isHome={true} />
      <ViewAllUsers />
    </>
  );
};
export default HomePage;
