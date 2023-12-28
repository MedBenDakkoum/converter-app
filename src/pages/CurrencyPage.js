import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BiDollar } from 'react-icons/bi';
import { MdSwapHoriz, MdArrowForward, MdWarning } from 'react-icons/md';
import classNames from 'classnames';
import { addConversion, setAmount, setExchangeRatesDate, setFromCurrency, setToCurrency, showNotification, swapCurrencies, useGetExchangeRatesQuery } from '../store';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import Button from '../components/Button';
import CURRENCIES from '../currencies';
import SeparatedInput from '../components/SeparatedInput';

function CurrencyPage() {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, exchangeRatesDate } = useSelector((state) => state.currencyReducer);
  const [searchParams, setSearchParams] = useSearchParams({});

  const { data } = useGetExchangeRatesQuery(
    { base: searchParams.get('from'), currency: searchParams.get('to'), date: searchParams.get('date') },
    { skip: !searchParams.has('from') }
  );

  const formatedDate = (exchangeRatesDate.year || exchangeRatesDate.month || exchangeRatesDate.day) ?
    `${exchangeRatesDate.year}-${(exchangeRatesDate.month).padStart(2, '0')}-${(exchangeRatesDate.day).padStart(2, '0')}` : '';

  useEffect(() => {
    if (searchParams.has('from')) {
      if (searchParams.get('from') !== fromCurrency) dispatch(setFromCurrency(searchParams.get('from')));
      if (searchParams.get('to') !== toCurrency) dispatch(setToCurrency(searchParams.get('to')));
      if (searchParams.get('amount') !== amount) dispatch(setAmount(searchParams.get('amount')));
      if (searchParams.get('date') !== exchangeRatesDate) dispatch(setExchangeRatesDate({ property: 'date', value: searchParams.get('date') }));
    } else if (!searchParams.has('from') && amount > 0 && toCurrency !== fromCurrency) {
      setSearchParams({
        from: fromCurrency, to: toCurrency, amount, date: formatedDate
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertCurrencies = () => {
    if (amount <= 0 || amount === '') {
      dispatch(showNotification('Enter currency amount'));
      return;
    }

    if (toCurrency === fromCurrency) {
      dispatch(showNotification('Currencies must be different'));
      return;
    }

    setSearchParams({
      from: fromCurrency, to: toCurrency, amount, date: formatedDate
    });
  };

  const unsyncedChanges = (
    (searchParams.get('to') !== toCurrency || searchParams.get('from') !== fromCurrency ||
      searchParams.get('amount') !== amount || searchParams.get('date') !== formatedDate)
    && searchParams.has('amount')
  );

  const result = useMemo(() => {
    let result = '';
    if (!!searchParams.get('date')) {
      if (data?.data?.[searchParams.get('date')]?.[searchParams.get('to')]) {
        result = (searchParams.get('amount') * data.data[searchParams.get('date')][searchParams.get('to')]).toFixed(2);
      }
    } else {
      if (data?.data?.[searchParams.get('to')]) {
        result = (searchParams.get('amount') * data.data[searchParams.get('to')]).toFixed(2);
      }
    }

    return (result) ? `${searchParams.get('amount')} ${searchParams.get('from')} = ${result} ${searchParams.get('to')}` : '';
  }, [data, searchParams]);

  useEffect(() => {
    if (result) {
      const now = new Date();
      const conversion = {
        converter: 'Currency', date: now.getTime(), result, link: `/?${searchParams.toString()}`
      };

      setTimeout(() => dispatch(addConversion(conversion)), 500);
    }
  }, [searchParams, dispatch, result]);

  const pageClass = classNames(
    'px-4', 'py-10', 'sm:p-16',
    'md:w-[50vw]', 'md:h-[50vh]', 'md:p-0', 'md:rounded-b-[1.125rem]', 'md:bg-[white]',
    'md:shadow-lg', 'md:shadow-neutral-2', 'md:dark:bg-neutral-dark-2', 'md:dark:shadow-neutral-dark-3',
    'lg:w-[45vw]', 'lg:h-[45vh]', 'xl:w-[30vw]', 'xl:h-[70vh]');

  return (
    <div className={pageClass}>
      <div className="hidden md:block md:shadow-lg md:shadow-neutral-2 md:h-4 md:-mt-4 md:dark:hidden"></div>
      <div className="p-4 rounded-2xl shadow-md md:w-full md:py-10 md:shadow-none dark:bg-neutral-dark-2 dark:shadow-neutral-dark-3">
        <p className="-mx-4 mb-5 pb-2 text-lg text-center font-bold border-b-[1.5px] border-neutral-2 dark:text-neutral-2">
          {(searchParams.has('amount')) ?
            result : <span className="text-neutral-3">Currency not converted</span>}
        </p>

        <Input value={amount} onChange={(text) => dispatch(setAmount(text))} onSubmit={convertCurrencies}
          type="number" placeholder="Enter amount ..." icon={<BiDollar className="w-6 h-6" />} />
        <SeparatedInput />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mt-2 mb-4">
          <Dropdown value={fromCurrency} onChange={(currency) => dispatch(setFromCurrency(currency))} options={CURRENCIES} />
          <button className="p-2 bg-neutral-2 rounded-full duration-200 hover:opacity-80" onClick={() => dispatch(swapCurrencies())}>
            <MdSwapHoriz className="w-6 h-6" />
          </button>
          <Dropdown value={toCurrency} onChange={(currency) => dispatch(setToCurrency(currency))} options={CURRENCIES} alignRight />
        </div>

        <Button className="w-full" onClick={convertCurrencies}>
          <span>Convert</span>
          <MdArrowForward className="w-6 h-6" />
        </Button>
      </div>

      {unsyncedChanges &&
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <MdWarning className="w-6 h-6" />
          <p className="font-bold">Unsynced changes</p>
        </div>}
    </div>
  );
}

export default CurrencyPage;
