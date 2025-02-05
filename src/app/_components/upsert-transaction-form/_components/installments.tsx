import { Input } from "@/_components/ui/input";
import { Switch } from "@/_components/ui/switch";
import { moneyFormat } from "@/_lib/money-format";
import React, { useState } from "react";
import { InputProps } from "react-day-picker";

const InstallmentsInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { amount: number }
>(({ amount, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  const value = (props.value as number) || 1;

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-sm font-bold">
          Does this transaction have installments?
        </span>
        <Switch
          checked={isChecked}
          onCheckedChange={(value) => setIsChecked(value)}
        />
      </div>

      {isChecked && (
        <div className="mt-2 rounded border border-green-800 bg-green-950 p-2">
          <span className="text-sm font-bold">How many installments?</span>
          <Input
            placeholder="Type in the number of installments..."
            type="number"
            defaultValue={1}
            ref={ref}
            {...props}
          />

          {value > 1 && amount > 0 && (
            <span>
              {value} installments of {moneyFormat(amount / value)} each
            </span>
          )}
        </div>
      )}
    </div>
  );
});

InstallmentsInput.displayName = "InstallmentsInput";

export { InstallmentsInput };
