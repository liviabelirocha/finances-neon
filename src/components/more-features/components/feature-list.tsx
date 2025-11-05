import { Separator } from "@/components/ui/separator";
import React, { PropsWithChildren } from "react";

export const FeatureList = ({ children }: PropsWithChildren) => {
  const validChildren = React.Children.toArray(children);

  return (
    <div className="flex flex-col gap-2">
      {validChildren.map((child, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          {child}
          {idx !== validChildren.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};
