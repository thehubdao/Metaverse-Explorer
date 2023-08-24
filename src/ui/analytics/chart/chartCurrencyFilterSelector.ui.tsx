
import { Currencies } from "../../../enums/common.enum";
import { CURRENCY_FILTERS } from "../../../utils/analyticsChart";

interface ChartCurrencyFilterSelectorUI {
  currencySelected: Currencies; // Currently selected currency
  setCurrencySelected: React.Dispatch<React.SetStateAction<Currencies>>; // Function to set the selected currency
}

export default function ChartCurrencyFilterSelectorUI({ currencySelected, setCurrencySelected }: ChartCurrencyFilterSelectorUI) {
  return (
    <div className="flex gap-3">
      {/* Mapping through the available currency filters */}
      {CURRENCY_FILTERS.map(currency => {
        return (
          <button
            key={currency.currency}
            className={`rounded-lg h-12 bg-lm-fill px-2 ${currencySelected === currency.currency ? 'shadow-hollow-8' : 'shadow-relief-12'}`}
            onClick={() => { setCurrencySelected(currency.currency) }}
          >{currency.name}</button>
        );
      })}
    </div>
  );
}
