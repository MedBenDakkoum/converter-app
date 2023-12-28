import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowForward } from 'react-icons/md';
import { toggleSelectedConversion } from '../store';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function HistoryConvertion({ converter, date, result, link }) {
  const dispatch = useDispatch();
  const selectedConversions = useSelector((state) => state.historyReducer.selectedConversions);
  const conversionRef = useRef();

  const conversionDate = new Date(date);

  const formattedHours = String(conversionDate.getHours()).padStart(2, '0');
  const formattedMinutes = String(conversionDate.getMinutes()).padStart(2, '0');

  const formattedDay = String(conversionDate.getDay()).padStart(2, '0');
  const formattedMonth = String(conversionDate.getMonth()).padStart(2, '0');

  useEffect(() => {
    const el = conversionRef.current;

    const toggleSelection = (event) => {
      if (!event.target.closest('a')) {
        dispatch(toggleSelectedConversion({
          addOrRemove: !selectedConversions.includes(date),
          date,
        }));
      }
    };
    if (el) conversionRef.current.addEventListener('click', toggleSelection);

    return () => {
      if (el) el.removeEventListener('click', toggleSelection);
    }
  }, [date, dispatch, selectedConversions]);

  const conversionClass = classNames(
    'flex', 'flex-col', 'space-y-0', 'px-4', 'py-1', 'space-y-1', 'rounded-[1rem]',
    'shadow-md', 'shadow-neutral-2', 'cursor-pointer', 'duration-200', 'hover:opacity-80', 'dark:shadow-neutral-dark-3',
    { 'bg-neutral-4': !selectedConversions.includes(date), 'bg-secondary-main': selectedConversions.includes(date) });
  const linkClass = classNames('p-2', 'rounded-full', 'duration-200',
    { 'bg-neutral-2': !selectedConversions.includes(date), 'bg-secondary-darker': selectedConversions.includes(date) });

  return (
    <div className={conversionClass} ref={conversionRef}>
      <div className="flex justify-between items-center space-x-2">
        <p className="font-bold">{converter}</p>
        <p>{formattedHours}:{formattedMinutes} {formattedDay}.{formattedMonth}.{conversionDate.getFullYear()}</p>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <p className="text-lg">{result}</p>

        <Link className={linkClass} to={link}>
          <MdArrowForward className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default HistoryConvertion;
