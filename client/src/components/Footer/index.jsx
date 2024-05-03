import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <Link to="/" className="btn btn-dark mb-3">
            &larr; Go Back
          </Link>
        )}
        <h4>{new Date().getFullYear()} - To Do List</h4>
      </div>
    </footer>
  );
};

export default Footer;
