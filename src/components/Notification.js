import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdWarning } from 'react-icons/md';
import classNames from 'classnames';
import { removeNotification, startNotificationFading } from '../store';
import Icon from './Icon';

function Notification({ index, text }) {
  const dispatch = useDispatch();
  const fadingNotifications = useSelector((state) => state.notificationsReducer.fadingNotifications);

  useEffect(() => {
    setTimeout(() => {
      dispatch(startNotificationFading(index));
    }, 4000);
  }, [dispatch, index]);

  const notificationClass = classNames(
    'flex', 'items-center', 'space-x-2', 'px-5', 'py-2', 'bg-error', 'rounded-full', 'shadow-md', 'shadow-neutral-3', 'dark:shadow-neutral-dark-3',
    {
      'animate-hide-notification': fadingNotifications.includes(index),
      'animate-show-notification': !fadingNotifications.includes(index)
    });

  if (fadingNotifications.includes(index)) {
    setTimeout(() => {
      dispatch(removeNotification(index));
    }, 300);
  }

  return (
    <div className={notificationClass}>
      <Icon src={<MdWarning className="w-6 h-6" />} color="white" />
      <p className="text-[white]">{text}</p>
      <Icon src={<MdClose className="w-6 h-6 cursor-pointer" onClick={() => dispatch(startNotificationFading(index))} />} color="white" />
    </div>
  );
}

export default Notification;
