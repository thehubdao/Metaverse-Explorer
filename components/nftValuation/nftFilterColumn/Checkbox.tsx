import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { BiCheck } from "react-icons/bi";

interface optionList {
  name: string;
  description?: string;
}

interface CheckBoxProps {
  filter: optionList;
  selectedFilters: string[]
  handleFilter: Function,
}

export function CheckBox({
  filter,
  selectedFilters,
  handleFilter
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  useEffect(() => {
    const checkCondition = selectedFilters.indexOf(filter.name) >= 0
    setIsChecked(checkCondition)
  }, [])

  return (
    <div className="flex justify-between font-plus px-5 py-[1.6px] font-medium text-grey-content transition-all">
      <p className="text-sm py">{filter.name}</p>
      <div
        className={`w-5 h-5 rounded-md cursor-pointer flex justify-center items-center ${isChecked ? 'nm-inset-soft' : 'nm-flat-soft'}`}
        onClick={() => {
          setIsChecked(!isChecked)
          handleFilter(filter.name, !isChecked)
        }}
      >
        <BiCheck className={isChecked ? 'text-grey-icon' : 'hidden'} />
      </div>
    </div>
  );
}