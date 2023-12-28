import { useSelector } from 'react-redux';
import Notification from './Notification';

function NotificationBar() {
  const notifications = useSelector((state) => state.notificationsReducer.notifications);

  const renderedNotifications = notifications.map((notification) =>
    <Notification key={notification.id} index={notification.id} text={notification.text} />)

  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2">
      {renderedNotifications}
    </div>
  );
}

export default NotificationBar;
