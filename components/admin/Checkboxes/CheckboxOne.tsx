import { useState } from "react";

interface CheckboxOneProps {
  text: string;
  name: string;
  value: string;
  checked?: boolean; // Membuat prop checked opsional
  onChange?: (value: string) => void; // Membuat prop onChange opsional
}

const CheckboxOne: React.FC<CheckboxOneProps> = ({ text, name, value, checked=undefined, onChange }) => {
  // Menggunakan state lokal hanya jika onChange tidak ada
  const [isChecked, setIsChecked] = useState<boolean>(checked as any);

  const handleCheckboxChange = () => {
    if (onChange) {
      onChange(value);
    } else {
      // Jika onChange tidak ada, ubah state lokal
      setIsChecked(!isChecked);
    }
  };

  console.log('ada disini', checked);

  const checkboxId = `${name}-${value}`;

  return (
    <div>
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={checkboxId}
            className="sr-only"
            name={name}
            value={value}
            defaultChecked={checked == undefined ? isChecked : checked} // Menggunakan checked dari props atau state lokal
            onChange={handleCheckboxChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${checked == undefined ? isChecked : checked ? "border-primary bg-gray dark:bg-transparent" : ""
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${checked == undefined ? isChecked : checked ? "bg-primary" : ""}`}
            ></span>
          </div>
        </div>
        {text}
      </label>
    </div>
  );
};

export default CheckboxOne;
