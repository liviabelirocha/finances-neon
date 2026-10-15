import { isIntegrationConfigured } from "@/actions/integrations/get-status";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ActiveLink } from "./active-link";

export const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => {
  const params = useParams();
  const pathname = usePathname();
  const [showCashFlow, setShowCashFlow] = useState(false);

  useEffect(() => {
    if (!params.board) return setShowCashFlow(false);

    let current = true;

    isIntegrationConfigured(params.board as string)
      .then((configured) => current && setShowCashFlow(configured))
      .catch(() => current && setShowCashFlow(false));

    return () => {
      current = false;
    };
  }, [params.board, pathname]);

  return (
    <>
      <ActiveLink href="/" onClick={onNavigate}>
        Boards
      </ActiveLink>
      {params.board && (
        <>
          <ActiveLink href={`/${params.board}`} passSearch onClick={onNavigate}>
            Dashboard
          </ActiveLink>
          <ActiveLink
            href={`/${params.board}/transactions`}
            passSearch
            onClick={onNavigate}
          >
            Transactions
          </ActiveLink>
          {showCashFlow && (
            <ActiveLink
              href={`/${params.board}/cash-flow`}
              passSearch
              onClick={onNavigate}
            >
              Daily budget
            </ActiveLink>
          )}
          <ActiveLink
            href={`/${params.board}/settings`}
            matchPrefix
            onClick={onNavigate}
          >
            Settings
          </ActiveLink>
        </>
      )}
    </>
  );
};
