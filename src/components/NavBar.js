import { BiDollar, BiSolidRuler, BiHistory } from 'react-icons/bi';
import classNames from 'classnames';
import NavBarLink from './NavBarLink';

function NavBar() {
  const navBarClass = classNames(
    'columns-3', 'space-x-2', 'pt-2', 'bg-gradient-to-br', 'from-primary', 'to-secondary-darker',
    'shadow-lg', 'shadow-neutral-2', 'md:rounded-t-[1.125rem]', 'md:shadow-none', 'dark:shadow-neutral-dark-3');

  return (
    <nav className={navBarClass}>
      <NavBarLink to="/" icon={<BiDollar className="w-7 h-7" />} text="Currency" />
      <NavBarLink to="/units" icon={<BiSolidRuler className="w-7 h-7" />} text="Units" />
      <NavBarLink to="/history" icon={<BiHistory className="w-7 h-7" />} text="History" />
    </nav>
  );
}

export default NavBar;
