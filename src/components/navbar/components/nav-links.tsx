import { useParams } from "next/navigation";
import { ActiveLink } from "./active-link";

export const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => {
  const params = useParams();

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
