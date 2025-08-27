import { memo, useEffect, useState } from "react";
import axios from "axios";
import Container from "../Container/Container";
import { OrbitProgress } from "react-loading-indicators";
import "./Users.scss";
import { API } from "../../utils"; // same style as your Posts

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}users?limit=10`);
      setUsers(response.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="users">
      <Container>
        <h2 className="users-title">Users</h2>

        {loading && (
          <div className="loading">
            <OrbitProgress color="#315acc" size="medium" text="" />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img
                src={user.image}
                alt={user.firstName}
                className="user-avatar"
              />
              <h3 className="user-name">
                {user.firstName} {user.lastName}
              </h3>
              <p className="user-email">{user.email}</p>
              <p className="user-company">{user.company?.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default memo(Users);
