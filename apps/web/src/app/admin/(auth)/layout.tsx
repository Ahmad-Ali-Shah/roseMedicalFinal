export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-auth-shell" id="main-content">
      <div className="admin-auth-shell__inner">{children}</div>
    </main>
  );
}
