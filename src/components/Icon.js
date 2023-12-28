import { IconContext } from 'react-icons';

function Icon({ src, color }) {
  return (
    <IconContext.Provider value={{ color }}>
      {src}
    </IconContext.Provider>
  );
}

export default Icon;
