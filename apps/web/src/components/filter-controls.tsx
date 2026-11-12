import { ChevronDown, Search } from "lucide-react";
import { useId, type ChangeEvent } from "react";

const fieldBase =
  "h-12 w-full rounded-[5px] border border-ak-field bg-white text-xs text-primary outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30";

export function SearchField({
  value,
  onChange,
  label = "Cari informasi",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const id = useId();
  return (
    <div className="relative flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-primary"
      />
      <input
        id={id}
        type="search"
        value={value}
        placeholder={`${label}…`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className={`${fieldBase} pr-4 pl-[46px] text-[13px] placeholder:text-ak-muted`}
      />
    </div>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="relative lg:w-[210px] lg:shrink-0">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={options.length < 2}
        onChange={(event) => onChange(event.target.value)}
        className={`${fieldBase} cursor-pointer appearance-none px-4 pr-10 disabled:cursor-default disabled:opacity-100`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-[15px] -translate-y-1/2 text-primary"
      />
    </div>
  );
}
