import {
  BookOpen,
  Building2,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { DepartmentIcon as IconName } from "../lib/profil";

const icons: Record<IconName, LucideIcon> = {
  buku: BookOpen,
  kepedulian: HeartHandshake,
  pemuda: Users,
  pendidikan: GraduationCap,
  keuangan: Wallet,
  sarana: Building2,
  umum: LayoutGrid,
};

/** Icon chosen for a bidang in the CMS (`bidang.ikon`). */
export function DepartmentIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name] ?? LayoutGrid;
  return <Icon aria-hidden="true" className={className} />;
}
