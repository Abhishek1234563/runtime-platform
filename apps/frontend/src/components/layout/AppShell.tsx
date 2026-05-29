import type { ReactNode }
from "react";

import { useAuthStore }
from "../../store/authStore";

interface Props {

  sidebar: ReactNode;

  editor: ReactNode;

  preview: ReactNode;
}

export default function AppShell({
  sidebar,
  editor,
  preview,
}: Props) {

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  return (
    <div className="
      min-h-screen
      bg-gray-100
      flex
    ">

      <aside className="
        w-72
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
      ">

        <div className="
          p-6
          border-b
          border-gray-200
        ">

          <h1 className="
            text-2xl
            font-bold
          ">
            Runtime Platform
          </h1>

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">
            AI App Generator
          </p>

        </div>

        <div className="
          flex-1
          overflow-auto
          p-4
        ">
          {sidebar}
        </div>

      </aside>

      <main className="
        flex-1
        flex
        flex-col
      ">

        <header className="
          h-16
          bg-white
          border-b
          border-gray-200
          flex
          items-center
          justify-between
          px-6
        ">

          <div className="
            font-semibold
            text-lg
          ">
            Runtime Builder
          </div>

          <button
            onClick={() => {

              logout();

              localStorage.removeItem(
                "token"
              );

              window.location.reload();
            }}

            className="
              bg-black
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Logout
          </button>

        </header>

        <div className="
          flex-1
          grid
          grid-cols-2
          overflow-hidden
        ">

          <div className="
            border-r
            border-gray-200
            overflow-auto
          ">
            {editor}
          </div>

          <div className="
            overflow-auto
            p-8
          ">
            {preview}
          </div>

        </div>

      </main>

    </div>
  );
}