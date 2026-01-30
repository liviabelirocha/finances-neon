import { redirect } from "next/navigation";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  redirect(`/${board}/settings/general`);
}
