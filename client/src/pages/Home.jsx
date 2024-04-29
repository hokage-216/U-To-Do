import { useQuery } from '@apollo/client';
import ProfileList from '../components/ProfileList';
import { QUERY_PROFILES } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {Auth.loggedIn() ? (
            <>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ProfileList  />
              )}
            </>
          ) : (
            <div>Please log in to see your Todo list.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
