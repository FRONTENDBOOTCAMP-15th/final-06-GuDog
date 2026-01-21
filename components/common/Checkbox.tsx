import { InputHTMLAttributes, forwardRef, useId } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label: string;
  hideLabel?: boolean;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hideLabel = false, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <input ref={ref} type="checkbox" id={inputId} className="peer sr-only" {...props} />
        <label
          htmlFor={inputId}
          className="w-6 h-6 cursor-pointer bg-[url('/images/checkbox-sprite.svg')] bg-[length:24px_96px] bg-[position:0_0] peer-checked:bg-[position:0_-24px] peer-focus:bg-[position:0_-48px] peer-checked:peer-focus:bg-[position:0_-72px]"
        >
          <span className={hideLabel ? "sr-only" : "sr-only"}>{label}</span>
        </label>
        {!hideLabel && (
          <label htmlFor={inputId} className="cursor-pointer text-sm text-[#1A1A1C]">
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
