import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { SectionLabel } from "./section-label";

interface PageHeaderProps {
  breadcrumb: readonly BreadcrumbItem[];
  label: string;
  title: string;
  intro: string;
}

export function PageHeader({ breadcrumb, label, title, intro }: PageHeaderProps) {
  return (
    <section
      id="pembuka-halaman"
      className="flex flex-col gap-[15px] bg-ak-cream px-[26px] pt-7 pb-8 lg:gap-[18px] lg:px-19 lg:pt-[38px] lg:pb-[52px]"
    >
      <Breadcrumb items={breadcrumb} />
      <SectionLabel>{label}</SectionLabel>
      <h1 className="text-[30px] leading-[1.3] font-bold text-ak-dark lg:text-[46px]">{title}</h1>
      <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">{intro}</p>
    </section>
  );
}
