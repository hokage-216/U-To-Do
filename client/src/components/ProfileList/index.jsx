import { Link } from 'react-router-dom';

const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="profile-list-title">{title}</h3>
      <div className="profile-list-container">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="profile-card">
              <div className="profile-card-header">
                {profile.name}
                <br />
                <span className="todo-count">
                  currently has {profile.todos ? profile.todos.length : 0}{' '}
                  Todo item
                  {profile.todos && profile.todos.length === 1 ? '' : 's'}
                </span>
              </div>

              <Link
                className="view-todos-link"
                to={`/profiles/${profile._id}`}
              >
                View their todos
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
