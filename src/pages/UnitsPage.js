import { Routes, Route } from 'react-router-dom';
import ConvertersLayout from '../components/ConvertersLayout';
import UnitConverter from '../components/UnitConverter';

function UnitsPage() {
  return (
    <Routes>
      <Route path="/" element={<ConvertersLayout />}>
        <Route path=":converter" element={<UnitConverter />} />
      </Route>
    </Routes>
  );
}

export default UnitsPage;
