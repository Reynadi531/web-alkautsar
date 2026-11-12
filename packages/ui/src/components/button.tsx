import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@web-alkautsar/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[5px] border text-[13px] font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-ak-dark",
        outline: "border-ak-border bg-transparent text-primary hover:bg-ak-pale",
        inverse: "border-ak-button-line bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
