const locale = navigator.language || 'en-US';
const fmtPrice = (price) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
const fmtMileage = (mi) => {
  const isMetric = !['en-US', 'en-GB', 'en-CA'].some(l => locale.startsWith(l));
  return isMetric ? `${Math.round(mi * 1.60934).toLocaleString()} km` : `${mi.toLocaleString()} mi`;
};
const distanceUnit = () => ['en-US', 'en-GB', 'en-CA'].some(l => locale.startsWith(l)) ? 'mi' : 'km';
export { fmtPrice, fmtMileage, distanceUnit };
