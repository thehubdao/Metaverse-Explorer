import { useState } from "react";

interface FilterItemProps {
  label: string; // Label for the filter item
  isChecked: boolean; // Flag indicating if the checkbox is checked or not
  handleChange: () => void; // Function to handle checkbox state changes
}

//* FilterItem component represents a single filter item with a label and checkbox.
export default function FilterItemUI({ label, isChecked, handleChange }: FilterItemProps) {
  const [checked, setChecked] = useState<boolean>(isChecked);

  return (
    <button className="w-full flex justify-between items-center gap-3 cursor-default">
      <p className="truncate">{label}</p>
      <input
        type="checkbox"
        checked={checked}
        className="cursor-pointer"
        onChange={(e) => {
          e.stopPropagation();
          setChecked(!checked);
          handleChange();
        }}
      />
    </button>
  );
}