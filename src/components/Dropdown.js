import { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch } from 'react-icons/md';

function Dropdown({ value, onChange, options, alignRight, units }) {
  const [isOpen, setIsOpen] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownEl = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownEl.current === null || isOpen === 0) return;
      if (!dropdownEl.current.contains(event.target)) setIsOpen(1);
    }
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const renderedOptions = useMemo(() => {
    const filteredOptions = (searchTerm) ?
      options.filter((option) =>
        option[0].toLowerCase().includes(searchTerm.toLowerCase()) || option[1].toLowerCase().includes(searchTerm.toLowerCase())
      ) : options;

    const handleOptionClick = (currency) => {
      onChange(currency[0]);
      setIsOpen(1);
    }

    return filteredOptions.map((currency) => {
      const optionClass = classNames('px-3', 'py-2', 'border-b-[1.5px]', 'border-neutral-3', 'last:border-b-0', 'hover:bg-neutral-4',
        { 'bg-neutral-4': value === currency[0], 'bg-neutral-2': value !== currency[0] });

      return <div className={optionClass} key={currency[0]} onClick={() => handleOptionClick(currency)}>
        <p className="whitespace-nowrap"><b>{currency[0]}:</b> {currency[1]}</p>
      </div>
    });
  }, [searchTerm, onChange, options, value]);

  const dropdownClass = classNames('relative', 'cursor-pointer', 'dropdown', { 'flex flex-col items-end': alignRight });
  const currentValueClass = classNames(
    'flex', 'justify-between', 'items-center', 'h-full', 'space-x-2', 'px-3', 'py-2', 'rounded-full', 'duration-200', 'hover:bg-neutral-4',
    { 'bg-neutral-4': isOpen === 2, 'bg-neutral-2': isOpen !== 2, 'w-[6.25rem]': units, 'w-full': !units });

  const optionsClass = classNames(
    'absolute', 'z-20', 'mt-12',
    {
      'mt-12': alignRight, 'mt-2': !alignRight,
      'origin-top-right': alignRight, 'origin-top-left': !alignRight,
      'animate-open-dropdown': isOpen === 2, 'animate-close-dropdown': isOpen === 1,
      'hidden': isOpen === 0
    });

  return (
    <div className={dropdownClass} ref={dropdownEl}>
      <div className={currentValueClass} onClick={() => setIsOpen((isOpen === 2) ? 1 : 2)}>
        <p className="text-base font-bold">{value}</p>
        {(isOpen === 2) ? <MdKeyboardArrowUp className="w-6 h-6" /> : <MdKeyboardArrowDown className="w-6 h-6" />}
      </div>

      <div className={optionsClass}>
        <div className="flex space-x-2 px-3 py-2 bg-neutral-2 rounded-t-2xl">
          <MdSearch className="w-6 h-6" />
          <input className=
            "grow bg-[transparent] outline-none border-b-2 border-neutral-3 duration-200 placeholder:text-neutral-3 focus:border-secondary-main"
            value={searchTerm} onInput={(event) => setSearchTerm(event.target.value)} type="text"
            placeholder={(units) ? 'Search for units ...' : "Search for currencies ..."} />
        </div>
        <div className="relative max-h-60 overflow-auto rounded-b-2xl shadow-md shadow-neutral-2 dark:shadow-neutral-dark-3">
          {renderedOptions}
          {renderedOptions.length > 6 &&
            <div className="fixed bottom-0 w-full h-7 bg-gradient-to-t from-neutral-3 rounded-b-2xl"></div>}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
