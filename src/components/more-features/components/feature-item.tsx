import Link from "next/link";
import { ReactNode } from "react";

export type FeatureItemProps = {
  name: string;
  description?: string;
  icon: ReactNode;
} & (
  | {
      href: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick: () => void;
    }
);

export const FeatureItem = ({
  name,
  description,
  icon,
  href,
  onClick,
}: FeatureItemProps) => {
  const content = (
    <div className="flex items-center gap-2 rounded p-2 hover:bg-slate-800">
      {icon}
      <div className="flex flex-col">
        <span>{name}</span>
        {description && (
          <span className="text-sm text-slate-400">{description}</span>
        )}
      </div>
    </div>
  );

  if (href)
    return (
      <Link href={href} className="block cursor-pointer">
        {content}
      </Link>
    );

  return (
    <div onClick={onClick} className="cursor-pointer">
      {content}
    </div>
  );
};
