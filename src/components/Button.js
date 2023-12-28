import classNames from 'classnames';

function Button({ className, children, ...rest }) {
  const buttonClass = classNames(
    'flex', 'justify-center', 'items-center', 'space-x-2', 'px-5', 'py-2',
    'text-lg', 'text-[white]', 'font-bold', 'text-center', 'bg-gradient-to-br',
    'from-primary', 'to-secondary-darker', 'rounded-full', 'shadow-md', 'shadow-neutral-2',
    'duration-200', 'hover:opacity-80', 'active:scale-95', 'dark:shadow-neutral-dark-3', className);

  return <button className={buttonClass} {...rest}>{children}</button>;
}

export default Button;
