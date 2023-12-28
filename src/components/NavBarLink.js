import { NavLink } from 'react-router-dom';
import Icon from './Icon';

function NavBarLink({ to, icon, text }) {
  return (
    <NavLink to={to} className={({ isActive }) =>
      (isActive) ? "flex flex-col items-center space-y-1 pb-1.5 border-b-2 border-[white]" :
        "flex flex-col items-center space-y-1 pb-1.5"}>
      <Icon src={icon} color="white" />
      <p className="text-md font-bold text-[white]">{text}</p>
    </NavLink>
  );
}

export default NavBarLink;
