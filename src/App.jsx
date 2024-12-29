import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./Body";
import {
  Connections,
  ErrorPage,
  Feed,
  Login,
  Profile,
  Requests,
} from "./components";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { useEffect, useState } from "react";

function App() {

  const [hasRefreshToken, setHasRefreshToken] = useState(false);

  useEffect(() => {
    // Check token
    const token = localStorage.getItem("token");
    if (token) {
      setHasRefreshToken(true);
    } else {
      setHasRefreshToken(false);
    }
  }, [hasRefreshToken]);

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
          <Route
            path="/login"
            element={
              <Login
                setHasRefreshToken={setHasRefreshToken}
                hasRefreshToken={hasRefreshToken}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
