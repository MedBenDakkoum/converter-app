import { useDispatch, useSelector } from 'react-redux';
import { MdHistory } from 'react-icons/md';
import classNames from 'classnames';
import { setExchangeRatesDate } from '../store';

function SeparatedInput() {
  const dispatch = useDispatch();
  const exchangeRatesDate = useSelector((state) => state.currencyReducer.exchangeRatesDate);

  const handleInput = (event, property) => {
    const text = event.target.value;
    if (text.match(/^[0-9]*$/) && ((property === 'year' && text.length <= 4) || (property !== 'year' && text.length <= 2))) {
      dispatch(setExchangeRatesDate({ property, value: event.target.value }));
    }
  };

  const inputDivClass = classNames('flex', 'items-center', 'w-full', 'space-x-3', 'mt-2',
    'px-3', 'py-2', 'bg-neutral-2', 'rounded-[1.375rem]', 'duration-200', 'focus-within:bg-neutral-4');
  const inputClass = classNames('text-xl', 'text-center', 'bg-[transparent]', 'outline-none', 'border-b-2',
    'border-neutral-3', 'duration-200', 'placeholder:text-neutral-3', 'focus:border-secondary-main');

  return (
    <div className={inputDivClass}>
      <MdHistory className="w-6 h-6" />
      <div className="flex flex-col">
        <p className="text-sm text-neutral-3">Exchange rates date</p>
        <div className="flex items-end space-x-2">
          <input className={`${inputClass} w-6`} value={exchangeRatesDate.day} onInput={(event) => handleInput(event, 'day')} type="number" placeholder="00" />
          <span className="text-2xl leading-[1.5rem] text-neutral-3">.</span>
          <input className={`${inputClass} w-6`} value={exchangeRatesDate.month} onInput={(event) => handleInput(event, 'month')} type="number" placeholder="00" />
          <span className="text-2xl leading-[1.5rem] text-neutral-3">.</span>
          <input className={`${inputClass} w-12`} value={exchangeRatesDate.year} onInput={(event) => handleInput(event, 'year')} type="number" placeholder="0000" />
        </div>
      </div>
    </div>
  );
}

export default SeparatedInput;
