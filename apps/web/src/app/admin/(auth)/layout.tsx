export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-shell" id="main-content"><div>{children}</div></main>;
}
