import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export const ActiveLink = ({
  children,
  ...props
}: LinkProps &
  PropsWithChildren & {
    check?: string;
  }) => {
  const pathname = usePathname();

  return (
    <Link
      className={
        pathname === props.href
          ? "font-bold text-primary"
          : "text-muted-foreground"
      }
      {...props}
    >
      {children}
    </Link>
  );
};
