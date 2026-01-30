import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

export const ActiveLink = ({
  children,
  passSearch,
  matchPrefix,
  href,
  onClick,
  ...props
}: LinkProps &
  PropsWithChildren & {
    passSearch?: boolean;
    matchPrefix?: boolean;
    onClick?: () => void;
  }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hrefString = href.toString();
  const isActive = matchPrefix
    ? pathname.startsWith(hrefString)
    : pathname === hrefString;

  return (
    <Link
      className={isActive ? "font-bold text-primary" : "text-muted-foreground"}
      href={`${hrefString}${passSearch ? `?${searchParams.toString()}` : ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};
