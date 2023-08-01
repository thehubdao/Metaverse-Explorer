import { Currencies } from "../../../enums/common";
import { CURRENCY_FILTERS } from "../../../utils/analyticsChart";

// Interface for props used in the component.
interface ChartCurrencyFilterSelectorUI {
  currencySelected: Currencies; // Currently selected currency
  setCurrencySelected: React.Dispatch<React.SetStateAction<Currencies>>; // Function to set the selected currency
}

//* React functional component responsible for rendering the currency filter selector UI.
export default function ChartCurrencyFilterSelectorUI({ currencySelected, setCurrencySelected }: ChartCurrencyFilterSelectorUI) {
  return (
    // Container for the currency filter selector buttons.
    <div className="flex gap-3">
      {/* Mapping through the available currency filters */}
      {CURRENCY_FILTERS.map(currency => {
        return (
          <button
            key={currency.currency} // React key to identify each button uniquely
            className={`rounded-lg h-12 bg-lm-fill px-2 ${currencySelected === currency.currency ? 'shadow-hollow-8' : 'shadow-relief-12'}`}
            onClick={() => { setCurrencySelected(currency.currency) }}
          >
            {currency.name}
          </button>
        );
      })}
    </div>
  );
}
