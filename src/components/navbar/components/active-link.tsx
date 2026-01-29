import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

export const ActiveLink = ({
  children,
  passSearch,
  href,
  onClick,
  ...props
}: LinkProps &
  PropsWithChildren & {
    passSearch?: boolean;
    onClick?: () => void;
  }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Link
      className={
        pathname === href ? "font-bold text-primary" : "text-muted-foreground"
      }
      href={`${href}${passSearch ? `?${searchParams.toString()}` : ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
};
