"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION_GROUPS } from "./admin-navigation-model";

export function AdminNavigation() {
  const pathname = usePathname();
  return (
    <nav className="admin-navigation" aria-label="Owner workspace navigation">
      {ADMIN_NAVIGATION_GROUPS.map((group) => (
        <section
          className="admin-navigation__group"
          key={group.key}
          aria-labelledby={`admin-nav-${group.key}`}
        >
          <h2 id={`admin-nav-${group.key}`}>{group.label}</h2>
          <ul>
            {group.items.map((item) => {
              const active = item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.key}>
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}
