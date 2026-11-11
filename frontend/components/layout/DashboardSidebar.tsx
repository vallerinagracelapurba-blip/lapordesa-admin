"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentIcon, HomeIcon, PeopleIcon, SettingsIcon } from "./DashboardIcons";
const items = [
  { href: "/dashboard", label: "Dashboard", Icon: HomeIcon },
  { href: "/laporan", label: "Data Laporan", Icon: DocumentIcon },
  { href: "/warga", label: "Data Warga", Icon: PeopleIcon },
  { href: "/pengaturan", label: "Pengaturan", Icon: SettingsIcon },
];
export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">
      <div className="flex h-[110px] items-center justify-center">
        <img src="/login-logo.png" alt="LaporDesa" className="w-[190px] object-contain" />
      </div>
      <nav className="mt-[36px] px-[25px]">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold ${active ? "bg-[#B9E4D8]" : "hover:bg-[#EAF5F2]"}`}><Icon /><span>{label}</span></Link>;
        })}
      </nav>
    </aside>
  );
}
