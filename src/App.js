import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Tasks from "./components/Tasks/index";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoggedIn(token);
  }, [token]);

  return (
    <div>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Logout setIsLoggedIn={setIsLoggedIn} />
      )}

      {isLoggedIn && <Tasks />}
    </div>
  );
}

export default App;
