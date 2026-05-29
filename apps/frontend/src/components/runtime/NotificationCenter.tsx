import {
  useNotificationStore
}
from "../../store/notificationStore";

export default function NotificationCenter() {

  const { notifications } =
    useNotificationStore();

  return (
    <div className="
      fixed
      top-4
      right-4
      z-50
      space-y-3
    ">

      {notifications.map((notification) => (

        <div
          key={notification.id}

          className="
            bg-black
            text-white
            px-4
            py-3
            rounded-lg
            shadow-lg
            min-w-[250px]
          "
        >
          {notification.message}
        </div>

      ))}

    </div>
  );
}