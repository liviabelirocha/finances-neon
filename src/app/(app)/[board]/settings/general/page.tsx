import { getBoardMembers } from "@/actions/board/get-members";
import { getBoard } from "@/actions/board/get";
import { BoardDetails } from "./_components/board-details";
import { DangerZone } from "./_components/danger-zone";
import { MembersList } from "./_components/members-list";

export default async function GeneralSettingsPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board: boardId } = await params;

  const [board, members] = await Promise.all([
    getBoard(boardId),
    getBoardMembers(boardId),
  ]);

  if (!board)
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">General Settings</h1>
          <p className="text-muted-foreground">Board not found.</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">General Settings</h1>
        <p className="text-muted-foreground">
          Manage your board details, members, and more.
        </p>
      </div>

      <BoardDetails boardId={boardId} name={board.name} />

      <MembersList
        boardId={boardId}
        members={members}
        memberCount={members.length}
      />

      <DangerZone boardId={boardId} boardName={board.name} />
    </div>
  );
}
