import Hero from '../components/Hero.jsx';
import HomeCards from '../components/HomeCards.jsx';
import UserListings from '../components/UserListings.jsx';
import ViewAllUsers from '../components/ViewAllUsers.jsx';

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
