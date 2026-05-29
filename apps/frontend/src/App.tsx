import Playground
from "./pages/Playground";

import Login
from "./pages/Login";

import NotificationCenter
from "./components/runtime/NotificationCenter";

import { useAuthStore }
from "./store/authStore";

export default function App() {

  const { token } =
    useAuthStore();

  if (!token) {

    return <Login />;
  }

  return (
    <>

      <NotificationCenter />

      <Playground />

    </>
  );
}