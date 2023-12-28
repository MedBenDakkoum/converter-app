import classNames from 'classnames';

function Input({ value, onChange, onSubmit, type, placeholder, icon }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!!onSubmit) onSubmit();
  };

  const inputClass = classNames(
    'flex', 'justify-between', 'items-center', 'w-full', 'grow',
    'px-3', 'py-2', 'bg-neutral-2', 'rounded-full', 'duration-200', 'focus-within:bg-neutral-4',
    { 'space-x-2 px-3 ': !!icon, 'px-4': !icon });

  return (
    <form className={inputClass} onSubmit={handleSubmit}>
      {icon}
      <input className="grow w-full text-xl bg-[transparent] outline-none" value={value}
        onInput={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} />
    </form>
  );
}

export default Input;
