import { useState } from "react";

import { api } from "../lib/api";

import { useAuthStore }
from "../store/authStore";

export default function Login() {

  const { setToken } =
    useAuthStore();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      setToken(
        response.data.token
      );

      window.location.reload();

    } catch (error) {

      alert("Login failed");
    }
  }

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <div className="
        bg-white
        p-8
        rounded-xl
        shadow
        w-full
        max-w-md
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          Login
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />

          <button
            onClick={handleLogin}

            className="
              w-full
              bg-black
              text-white
              p-3
              rounded-lg
            "
          >
            Login
          </button>

        </div>

      </div>
    </div>
  );
}