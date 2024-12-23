import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="*" element={<Requests />} />
            <Route path="/error" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
