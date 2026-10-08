"use client";

import type { ReactNode } from "react";
import {
  type Color,
  ColorArea as ColorAreaPrimitive,
  type ColorAreaProps,
  ColorField as ColorFieldPrimitive,
  type ColorFieldProps as ColorFieldPrimitiveProps,
  type ColorFormat,
  ColorPicker as ColorPickerPrimitive,
  ColorSlider as ColorSliderPrimitive,
  type ColorSliderProps as ColorSliderPrimitiveProps,
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  type ColorSwatchPickerItemProps,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  type ColorSwatchPickerProps,
  ColorSwatch as ColorSwatchPrimitive,
  type ColorSwatchProps,
  ColorThumb as ColorThumbPrimitive,
  type ColorThumbProps,
  composeRenderProps,
  Dialog,
  DialogTrigger,
  SliderOutput,
  SliderTrack,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { Description, FieldError, Input, Label } from "./field";
import { Popover, type PopoverProps } from "./popover";

export function ColorThumb({ className, ...props }: ColorThumbProps) {
  return (
    <ColorThumbPrimitive
      data-slot="color-thumb"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "size-4.5 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_1px_3px_rgb(0_0_0/0.3)] transition-[width,height] data-dragging:size-5.5 data-focus-visible:size-5.5",
      )}
    />
  );
}

export function ColorArea({ className, ...props }: ColorAreaProps) {
  return (
    <ColorAreaPrimitive
      data-slot="color-area"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "size-48 shrink-0 rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)] data-disabled:opacity-50",
      )}
    >
      <ColorThumb />
    </ColorAreaPrimitive>
  );
}

export interface ColorSliderProps extends ColorSliderPrimitiveProps {
  label?: string;
}

export function ColorSlider({ label, className, ...props }: ColorSliderProps) {
  return (
    <ColorSliderPrimitive
      data-slot="color-slider"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex w-full flex-col gap-2 data-disabled:opacity-50",
      )}
    >
      {label && (
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          <SliderOutput className="text-muted-foreground text-sm tabular-nums" />
        </div>
      )}
      <SliderTrack className="h-3 w-full rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]">
        <ColorThumb className="top-1/2" />
      </SliderTrack>
    </ColorSliderPrimitive>
  );
}

export function ColorSwatch({ className, ...props }: ColorSwatchProps) {
  return (
    <ColorSwatchPrimitive
      data-slot="color-swatch"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "size-7 shrink-0 rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]",
      )}
    />
  );
}

export function ColorSwatchPicker({
  className,
  ...props
}: ColorSwatchPickerProps) {
  return (
    <ColorSwatchPickerPrimitive
      data-slot="color-swatch-picker"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "flex flex-wrap gap-1.5",
      )}
    />
  );
}

export function ColorSwatchPickerItem({
  className,
  ...props
}: ColorSwatchPickerItemProps) {
  return (
    <ColorSwatchPickerItemPrimitive
      data-slot="color-swatch-picker-item"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "relative rounded-md outline-none ring-offset-2 ring-offset-popover transition-shadow data-hovered:ring-2 data-hovered:ring-border data-focus-visible:ring-2 data-selected:ring-2 data-focus-visible:ring-ring data-selected:ring-ring data-disabled:opacity-50",
      )}
    >
      <ColorSwatch />
    </ColorSwatchPickerItemPrimitive>
  );
}

export interface ColorFieldProps extends ColorFieldPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function ColorField({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  ...props
}: ColorFieldProps) {
  return (
    <ColorFieldPrimitive
      data-slot="color-field"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <Input placeholder={placeholder} className="font-mono" />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ColorFieldPrimitive>
  );
}

export interface ColorPickerProps {
  label?: string;
  value?: string | Color;
  defaultValue?: string | Color;
  onChange?: (value: Color) => void;
  /** Preset colors shown under the editor. */
  swatches?: string[];
  children?: ReactNode;
  /** Disables the trigger, keeps the popover closed and excludes the value from forms. */
  isDisabled?: boolean;
  /** Name of a hidden input, rendered next to the trigger, that submits the color. */
  name?: string;
  /** Id of a `<form>` to associate the hidden input with. */
  form?: string;
  /** Format of the submitted value. Defaults to `"hex"` (`#RRGGBB`, alpha dropped). */
  valueFormat?: ColorFormat | "css";
  /** Whether the popover is open (controlled). */
  isOpen?: boolean;
  /** Whether the popover is open initially (uncontrolled). */
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /** Popover placement relative to the trigger. */
  placement?: PopoverProps["placement"];
  /** Classes for the trigger button. */
  className?: ButtonProps["className"];
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/** Swatch button that opens a popover with a saturation/brightness area, hue slider, hex field and presets. */
export function ColorPicker({
  label,
  swatches,
  children,
  isDisabled,
  name,
  form,
  valueFormat = "hex",
  isOpen,
  defaultOpen,
  onOpenChange,
  placement = "bottom start",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  ...props
}: ColorPickerProps) {
  return (
    <ColorPickerPrimitive {...props}>
      {({ color }) => (
        <>
          <DialogTrigger
            isOpen={isDisabled ? false : isOpen}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
          >
            <Button
              data-slot="color-picker-trigger"
              variant="outline"
              id={id}
              isDisabled={isDisabled}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              aria-describedby={ariaDescribedby}
              className={composeRenderProps(className, (className) =>
                cn("gap-2 pr-3 pl-1.5", className),
              )}
            >
              <ColorSwatch className="size-5 rounded-[4px]" />
              {label}
            </Button>
            <Popover placement={placement}>
              <Dialog
                aria-label={label ?? ariaLabel ?? "Color picker"}
                className="flex w-[13.5rem] flex-col gap-3 p-3 outline-none"
              >
                {children ?? (
                  <>
                    <ColorArea
                      colorSpace="hsb"
                      xChannel="saturation"
                      yChannel="brightness"
                      className="w-full"
                    />
                    <ColorSlider colorSpace="hsb" channel="hue" />
                    <ColorField aria-label="Hex" />
                    {swatches && swatches.length > 0 && (
                      <ColorSwatchPicker aria-label="Presets">
                        {swatches.map((color) => (
                          <ColorSwatchPickerItem key={color} color={color} />
                        ))}
                      </ColorSwatchPicker>
                    )}
                  </>
                )}
              </Dialog>
            </Popover>
          </DialogTrigger>
          {name && (
            <input
              type="hidden"
              name={name}
              form={form}
              value={color.toString(valueFormat)}
              disabled={isDisabled}
            />
          )}
        </>
      )}
    </ColorPickerPrimitive>
  );
}
