import { SettingsSidebar } from "./_components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto p-4 md:flex-row md:p-6">
      <SettingsSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
