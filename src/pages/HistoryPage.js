import { useDispatch, useSelector } from 'react-redux';
import HistoryConvertion from '../components/HistoryConversion';
import { MdDelete } from 'react-icons/md';
import classNames from 'classnames';
import { deleteSelectedConversions, showNotification, toggleAllSelectedConversions } from '../store';
import Button from '../components/Button';

function HistoryPage() {
  const dispatch = useDispatch();
  const { allConversions, selectedConversions } = useSelector((state) => state.historyReducer);

  const deleteConversions = () => {
    if (selectedConversions.length === 0) {
      dispatch(showNotification('You have not selected any conversion'));
      return;
    }

    dispatch(deleteSelectedConversions());
  };

  const renderedConversions = allConversions.toReversed().map((conversion) =>
    <HistoryConvertion key={conversion.date} converter={conversion.converter}
      date={conversion.date} result={conversion.result} link={conversion.link} />);

  const pageClass = classNames(
    'px-4', 'py-10', 'overflow-hidden', 'sm:p-16',
    'md:w-[50vw]', 'md:h-[50vh]', 'md:p-0', 'md:bg-[white]', 'md:rounded-b-[1.125rem]',
    'md:shadow-lg', 'md:shadow-neutral-2', 'md:dark:bg-neutral-dark-2', 'md:dark:shadow-neutral-dark-3',
    'lg:w-[45vw]', 'lg:h-[45vh]', 'xl:w-[30vw]', 'xl:h-[70vh]'
  );

  const contentClass = classNames(
    'flex', 'flex-col', 'space-y-3', 'max-h-full', 'p-4', 'rounded-2xl', 'shadow-md', 'overflow-auto',
    'dark:bg-neutral-dark-2', 'dark:shadow-neutral-dark-3', 'md:h-full', 'md:px-4', 'md:py-10', 'md:shadow-none');

  return (
    <div className={pageClass}>
      <div className="hidden md:block md:shadow-lg md:shadow-neutral-2 md:h-4 md:-mt-4 md:mb-4 md:dark:hidden"></div>
      <div className={contentClass}>
        {(allConversions.length > 0) ?
          <><div className="flex justify-between items-center mb-2">
            <Button onClick={() => dispatch(toggleAllSelectedConversions())}>
              <span>{(selectedConversions.length === 0) ? 'Select all' : 'Deselect all'}</span>
            </Button>

            <button className="p-2 bg-neutral-2 rounded-full duration-200 hover:opacity-80" onClick={deleteConversions}>
              <MdDelete className="w-6 h-6" />
            </button>
          </div>

            {renderedConversions}</>
          : <p className="text-lg text-center font-bold text-neutral-3">You haven't made any conversions</p>}
      </div>
    </div>
  );
}

export default HistoryPage;
