"use client";

import { CheckIcon, XIcon } from "lucide-react";
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
} from "react";
import { Button as ButtonPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

export type StepStatus = "complete" | "current" | "upcoming" | "error";

interface StepperContextValue {
  orientation: "horizontal" | "vertical";
  size: "sm" | "md";
  currentStep?: number;
  onStepChange?: (index: number) => void;
  isLinear: boolean;
}

const StepperContext = createContext<StepperContextValue>({
  orientation: "horizontal",
  size: "md",
  isLinear: true,
});

const StepIndexContext = createContext<{ index: number; isLast: boolean }>({
  index: 0,
  isLast: true,
});

export interface StepperProps extends Omit<ComponentProps<"ol">, "onChange"> {
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md";
  /** Zero-based index of the current step. Earlier steps are complete, later ones upcoming. */
  currentStep?: number;
  /** Makes steps pressable. Called with the zero-based index of the pressed step. */
  onStepChange?: (index: number) => void;
  /** When true (default), only steps up to `currentStep` can be pressed. */
  isLinear?: boolean;
}

/**
 * A sequence of steps in a multi-step flow, as an ordered list.
 * Step status is derived from `currentStep`, or set per step.
 */
export function Stepper({
  orientation = "horizontal",
  size = "md",
  currentStep,
  onStepChange,
  isLinear = true,
  className,
  children,
  ...props
}: StepperProps) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <StepperContext.Provider
      value={{ orientation, size, currentStep, onStepChange, isLinear }}
    >
      <ol
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(
          "flex w-full",
          orientation === "horizontal"
            ? "flex-row items-start gap-3"
            : "flex-col",
          className,
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <StepIndexContext.Provider
            key={step.key ?? index}
            value={{ index, isLast: index === steps.length - 1 }}
          >
            {step}
          </StepIndexContext.Provider>
        ))}
      </ol>
    </StepperContext.Provider>
  );
}

const indicatorVariants = tv({
  base: "relative z-10 flex shrink-0 items-center justify-center rounded-full border font-medium tabular-nums transition-[color,background-color,border-color,box-shadow] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    status: {
      complete: "border-brand bg-brand text-brand-foreground",
      current:
        "border-brand bg-card text-brand ring-[3px] ring-brand/15 dark:bg-transparent",
      upcoming:
        "border-border bg-card text-muted-foreground dark:bg-transparent",
      error: "border-destructive bg-destructive text-destructive-foreground",
    },
    size: {
      sm: "size-6 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "size-8 text-sm [&_svg:not([class*='size-'])]:size-4",
    },
  },
});

const statusText: Record<StepStatus, string> = {
  complete: "Completed",
  current: "Current step",
  upcoming: "Not started",
  error: "Error",
};

export interface StepProps
  extends Omit<ComponentProps<"li">, "title" | "children"> {
  title: ReactNode;
  description?: ReactNode;
  /** Overrides the status derived from the Stepper's `currentStep`. */
  status?: StepStatus;
  /** Replaces the step number (complete and error steps still show a check / cross unless set). */
  icon?: ReactNode;
  isDisabled?: boolean;
  /** Content under the title (vertical steppers only), e.g. the active step's form. */
  children?: ReactNode;
}

export function Step({
  title,
  description,
  status: statusProp,
  icon,
  isDisabled,
  className,
  children,
  ...props
}: StepProps) {
  const { orientation, size, currentStep, onStepChange, isLinear } =
    useContext(StepperContext);
  const { index, isLast } = useContext(StepIndexContext);
  const status: StepStatus =
    statusProp ??
    (currentStep === undefined
      ? "upcoming"
      : index < currentStep
        ? "complete"
        : index === currentStep
          ? "current"
          : "upcoming");
  const isCurrent = status === "current";
  const isPressable =
    !!onStepChange &&
    !isDisabled &&
    !(isLinear && currentStep !== undefined && index > currentStep);

  const glyph =
    icon ??
    (status === "complete" ? (
      <CheckIcon strokeWidth={2.5} />
    ) : status === "error" ? (
      <XIcon strokeWidth={2.5} />
    ) : (
      index + 1
    ));

  const vertical = orientation === "vertical";
  const reached = status === "complete";

  const body = (
    <>
      <span
        data-slot="step-indicator"
        className={indicatorVariants({ status, size })}
      >
        {glyph}
      </span>
      <span
        className={cn(
          "flex min-w-0 flex-col gap-0.5 text-left",
          size === "sm" ? "pt-0.5" : "pt-1.5",
        )}
      >
        <span
          data-slot="step-title"
          className={cn(
            "font-medium text-sm leading-tight",
            status === "upcoming" && "text-muted-foreground",
            status === "error" && "text-destructive",
          )}
        >
          {title}
        </span>
        {description && (
          <span
            data-slot="step-description"
            className="text-muted-foreground text-xs leading-snug"
          >
            {description}
          </span>
        )}
        <span className="sr-only">, {statusText[status]}</span>
      </span>
    </>
  );

  const triggerClass = cn(
    "flex min-w-0 items-start gap-3 rounded-md text-left outline-none",
    size === "sm" && "gap-2",
  );

  const connector = !isLast && (
    <span
      aria-hidden
      data-slot="step-connector"
      className={cn(
        "rounded-full transition-colors",
        reached ? "bg-brand" : "bg-border",
        vertical
          ? cn(
              "absolute bottom-1.5 w-px",
              size === "sm" ? "top-7.5 left-[11.5px]" : "top-9.5 left-[15.5px]",
            )
          : cn("h-px min-w-6 flex-1", size === "sm" ? "mt-3" : "mt-4"),
      )}
    />
  );

  return (
    <li
      data-slot="step"
      data-status={status}
      aria-current={isCurrent && !isPressable ? "step" : undefined}
      className={cn(
        "group/step relative flex min-w-0",
        vertical
          ? "flex-col gap-2 pb-6 last:pb-0"
          : cn("flex-1 items-start gap-3", isLast && "flex-none"),
        isDisabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {isPressable ? (
        <ButtonPrimitive
          data-slot="step-trigger"
          aria-current={isCurrent ? "step" : undefined}
          onPress={() => onStepChange?.(index)}
          className={cn(
            triggerClass,
            "cursor-default data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
            "data-hovered:[&_[data-slot=step-title]]:underline data-hovered:[&_[data-slot=step-title]]:underline-offset-4",
          )}
        >
          {body}
        </ButtonPrimitive>
      ) : (
        <div className={triggerClass}>{body}</div>
      )}
      {connector}
      {children && vertical && (
        <div
          data-slot="step-content"
          className={cn("text-sm", size === "sm" ? "pl-8" : "pl-11")}
        >
          {children}
        </div>
      )}
    </li>
  );
}
