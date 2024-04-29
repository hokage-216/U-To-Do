import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import backgroundImage from '../../assets/kelly-sikkema--1_RZL8BGBM-unsplash.jpeg'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    // backgroundRepeat: 'no-repeat',  
    backgroundPosition: 'center', 
  };

  return (
    <header className="text-dark mb-4 py-3" style={headerStyle}>
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <div className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            To Do List
          </h1>
        </div>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
   
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
