const converters = {
  length: {
    default: 'M',
    units: [
      ['KM', 'Kilometer'], ['M', 'Meter'], ['SM', 'Sentimeter'],
      ['MM', 'Millimeter'], ['QM', 'Micrometer'], ['NM', 'Nanometer'],
      ['MI', 'Mile'], ['YD', 'Yard'], ['FT', 'Foot'], ['IN', 'Inch'],
      ['LY', 'Light year']
    ],
    rate: {
      'KM': 0.001, 'M': 1, 'SM': 100, 'MM': 1000, 'QM': 1000000, 'NM': 1000000000,
      'MI': 0.0006213689, 'YD': 1.0936132983, 'FT': 3.280839895, 'IN': 39.37007874,
      'LY': 1.057008707E-16
    }
  },
  mass: {
    default: 'KG',
    units: [
      ['T', 'Ton'], ['KG', 'Kilogram'], ['G', 'Gram'],
      ['MG', 'Milligram'], ['QG', 'Microgram'], ['Q', 'Quintal'], ['LB', 'Pound'],
      ['OZ', 'Ounce'], ['CT', 'Carat'], ['GR', 'Grain'], ['ST', 'Stone'],
      ['DR', 'Dram']
    ],
    rate: {
      'T': 0.001, 'KG': 1, 'G': 1000, 'MG': 1000000, 'QG': 100000000, 'Q': 0.01,
      'LB': 2.2046226218, 'OZ': 35.27396195, 'CT': 5000, 'GR': 15432.358353,
      'ST': 0.1574730444, 'DR': 564.382
    }
  },
  temperature: {
    default: '°C',
    units: [
      ['°C', 'Celsius'], ['°F', 'Fahrenheit'], ['K', 'Kelvin']
    ],
    convert(from, fromUnit, toUnit) {
      const fromValue = Number(from);
      if (fromUnit === '°C' && toUnit === '°F') return ((9 / 5) * fromValue) + 32;
      else if (fromUnit === '°F' && toUnit === '°C') return (5 / 9) * (fromValue - 32);
      else if (fromUnit === '°C' && toUnit === 'K') return fromValue + 273.15;
      else if (fromUnit === 'K' && toUnit === '°C') return fromValue - 273.15;
      else if (fromUnit === '°F' && toUnit === 'K') return (5 / 9) * (fromValue - 32) + 273.15;
      else if (fromUnit === 'K' && toUnit === '°F') return (9 / 5) * (fromValue - 273.15) + 32;
      else return fromValue;
    }
  },
  area: {
    default: 'M²',
    units: [
      ['HA', 'Hectare'], ['A', 'Are'], ['KM²', 'Square kilometer'], ['M²', 'Square meter'],
      ['SM²', 'Square sentimeter'], ['MM²', 'Square millimeter'], ['QM²', 'Square micron'],
      ['MI²', 'Square mile'], ['YD²', 'Square yard'], ['FT²', 'Square foot'], ['IN²', 'Square inch']
    ],
    rate: {
      'HA': 0.0001, 'A': 0.0002471054, 'KM²': 0.000001, 'M²': 1,
      'SM²': 10000, 'MM²': 1000000, 'QM²': 1000000000000,
      'MI²': 3.861021585E-7, 'YD²': 1.1959900463, 'FT²': 10.763910417, 'IN²': 1550.0031
    }
  },
  pressure: {
    default: 'PA',
    units: [
      ['kPA', 'Kilopascal'], ['PA', 'Pascal'], ['B', 'Bar'],
      ['PSI', 'PSI'], ['KSI', 'KSI'], ['ATM', 'Atmosphere']
    ],
    rate: {
      'kPA': 0.001, 'PA': 1, 'B': 0.00001,
      'PSI': 0.0001450377, 'KSI': 1.450377377E-7, 'ATM': 0.0000098692
    }
  },
  time: {
    default: 'S',
    units: [
      ['DE', 'Decade'], ['Y', 'Year'], ['M', 'Month'], ['WK', 'Week'], ['D', 'Day'],
      ['H', 'Hour'], ['MIN', 'Minute'], ['S', 'Second'], ['MS', 'Millisecond']
    ],
    rate: {
      'DE': 3.168808781E-9, 'Y': 3.168808781E-8, 'M': 3.805175038E-7, 'WK': 0.0000016534, 'D': 0.0000115741,
      'H': 0.0002777778, 'MIN': 0.0166666667, 'S': 1, 'MS': 1000
    }
  },
  speed: {
    default: 'KM/H',
    units: [
      ['M/S', 'Meter per second'], ['KM/H', 'Kilometer per hour'], ['KM/S', 'Kilometer per second'],
      ['MA', 'Mach'], ['KN', 'Knot'], ['MPH', 'Mile per hour']
    ],
    rate: {
      'M/S': 0.2777777778, 'KM/H': 1, 'KM/S': 0.0002777778,
      'MA': 0.0009414715, 'KN': 0.5399568035, 'MPH': 0.6213711922,
    }
  },
  volume: {
    default: 'M³',
    units: [
      ['KM³', 'Cubic kilometer'], ['M³', 'Cubic meter'], ['CM³', 'Cubic sentimeter'], ['MM³', 'Cubic millimeter'],
      ['L', 'Liter'], ['ML', 'Milliliter'], ['GAL', 'Gallon'], ['QT', 'Quart'], ['PT', 'Pint']
    ],
    rate: {
      'KM³': 1.E-9, 'M³': 1, 'CM³': 1000000, 'MM³': 1000000000,
      'L': 1000, 'ML': 1000000, 'GAL': 219.9692483, 'QT': 879.8769932, 'PT': 1759.7539864,
    }
  },
  data: {
    default: 'GB',
    units: [
      ['B', 'Byte'], ['KB', 'Kilobyte'], ['MB', 'Megabyte'],
      ['GB', 'Gigabyte'], ['TB', 'Terabyte'], ['PB', 'Petabyte']
    ],
    rate: {
      'B': 1e+9, 'KB': 1e+6,
      'MB': 1000, 'GB': 1, 'TB': 0.001, 'PB': 1e-6,
    }
  }
};

export default converters;
