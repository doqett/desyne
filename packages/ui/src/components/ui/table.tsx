"use client";

import { ArrowUpIcon, ChevronRightIcon } from "lucide-react";
import { createContext, useContext } from "react";
import {
  Cell as CellPrimitive,
  type CellProps,
  Collection,
  Column as ColumnPrimitive,
  type ColumnProps,
  ColumnResizer,
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  ResizableTableContainer,
  type ResizableTableContainerProps,
  Row as RowPrimitive,
  type RowProps,
  TableBody as TableBodyPrimitive,
  type TableBodyProps,
  TableHeader as TableHeaderPrimitive,
  type TableHeaderProps,
  TableLoadMoreItem,
  type TableLoadMoreItemProps,
  Table as TablePrimitive,
  type TableProps as TablePrimitiveProps,
  useTableOptions,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Spinner } from "./spinner";

type Density = "compact" | "default" | "comfortable";
interface TableStyle {
  density: Density;
  striped: boolean;
  bordered: boolean;
  divided: boolean;
  bleed: boolean;
  resizable: boolean;
}
const TableStyleContext = createContext<TableStyle>({
  density: "default",
  striped: false,
  bordered: false,
  divided: true,
  bleed: false,
  resizable: false,
});

/** Extra edge padding on the first/last cell of a row for `bleed` tables. */
const bleedEdges = "first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pr-6";

const cellPadding: Record<Density, string> = {
  compact: "px-3 py-1.5",
  default: "px-(--cell-px) py-(--cell-py)",
  comfortable: "px-4 py-3.5",
};

export interface TableProps extends TablePrimitiveProps {
  density?: Density;
  striped?: boolean;
  /** Grid lines between every cell. */
  bordered?: boolean;
  /** Wrap the table in a rounded, bordered card (default true). */
  framed?: boolean;
  /** Horizontal lines between rows (default true). Set false for a gridless table. */
  divided?: boolean;
  /**
   * Full-bleed: no frame, the table extends into the parent's horizontal
   * padding (-mx-4 / sm:-mx-6) while the first and last columns keep text
   * aligned with the surrounding content. Rows and hovers reach the edges.
   */
  bleed?: boolean;
  /** Classes for the scroll container, e.g. `max-h-80` for a scrolling body. */
  containerClassName?: string;
  /**
   * Lets users drag column edges to resize them (React Aria
   * `ResizableTableContainer`). Every `Column` gets a resizer unless it sets
   * `isResizable={false}`; give columns `defaultWidth` / `minWidth` to control
   * the starting layout.
   */
  allowsResizing?: boolean;
  /** Called while a column is resized, with every column's width. */
  onResize?: ResizableTableContainerProps["onResize"];
  /** Called when a resize ends, e.g. to persist widths. */
  onResizeEnd?: ResizableTableContainerProps["onResizeEnd"];
}

export function Table({
  className,
  density = "default",
  striped = false,
  bordered = false,
  framed = true,
  divided = true,
  bleed = false,
  containerClassName,
  allowsResizing = false,
  onResize,
  onResizeEnd,
  ...props
}: TableProps) {
  const containerClass = cn(
    "relative w-full overflow-auto",
    framed && !bleed && "rounded-lg border bg-card shadow-xs",
    bleed && "-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)]",
    containerClassName,
  );
  const table = (
    <TablePrimitive
      data-slot="table"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "w-full caption-bottom border-separate border-spacing-0 text-sm outline-none",
          allowsResizing && "table-fixed",
        ),
      )}
    />
  );
  return (
    <TableStyleContext.Provider
      value={{
        density,
        striped,
        bordered,
        divided,
        bleed,
        resizable: allowsResizing,
      }}
    >
      {allowsResizing ? (
        <ResizableTableContainer
          data-slot="table-container"
          className={containerClass}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        >
          {table}
        </ResizableTableContainer>
      ) : (
        <div data-slot="table-container" className={containerClass}>
          {table}
        </div>
      )}
    </TableStyleContext.Provider>
  );
}

export function TableHeader<T extends object>({
  columns,
  children,
  className,
  ...props
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode } = useTableOptions();
  const { density, resizable, bleed } = useContext(TableStyleContext);
  return (
    <TableHeaderPrimitive
      data-slot="table-header"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "sticky top-0 z-10 bg-muted/50 backdrop-blur-sm",
      )}
    >
      {selectionBehavior === "toggle" && (
        <ColumnPrimitive
          {...(resizable ? { width: 44, minWidth: 44 } : {})}
          className={cn(
            "w-10 border-b text-left align-middle",
            cellPadding[density],
            bleed && bleedEdges,
          )}
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </ColumnPrimitive>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeaderPrimitive>
  );
}

export interface TableColumnProps extends ColumnProps {
  /** Show a resize handle (inside a `Table` with `allowsResizing`). Default true there. */
  isResizable?: boolean;
}

export function Column({
  className,
  children,
  isResizable,
  ...props
}: TableColumnProps) {
  const { density, bordered, resizable, bleed } = useContext(TableStyleContext);
  const withResizer = resizable && isResizable !== false;
  return (
    <ColumnPrimitive
      data-slot="table-column"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/column relative whitespace-nowrap border-b text-left align-middle font-medium text-muted-foreground text-xs outline-none",
          "data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset data-allows-sorting:cursor-default data-allows-sorting:data-hovered:text-foreground",
          cellPadding[density],
          bordered && "border-r last:border-r-0",
          bleed && bleedEdges,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (children, { allowsSorting, sortDirection }) => (
          <>
            <span
              className={cn(
                "inline-flex items-center gap-1",
                withResizer &&
                  "flex min-w-0 pr-2 [&>span:first-child]:truncate",
              )}
            >
              {withResizer ? <span>{children}</span> : children}
              {allowsSorting && (
                <ArrowUpIcon
                  aria-hidden
                  className={cn(
                    "size-3.5 shrink-0 transition-[rotate,opacity]",
                    sortDirection === "descending" && "rotate-180",
                    sortDirection
                      ? "text-brand"
                      : "opacity-0 group-data-hovered/column:opacity-50",
                  )}
                />
              )}
            </span>
            {withResizer && (
              <ColumnResizer
                data-slot="table-column-resizer"
                className={cn(
                  "absolute inset-y-0 right-0 z-10 flex w-3 translate-x-1/2 cursor-col-resize touch-none justify-center outline-none",
                  // The visible rail: hairline at rest, brand while hovered, dragged or focused.
                  "after:h-full after:w-px after:bg-border after:transition-colors",
                  "data-hovered:after:w-0.5 data-hovered:after:bg-brand/70",
                  "data-resizing:after:w-0.5 data-resizing:after:bg-brand",
                  "data-focus-visible:after:w-0.5 data-focus-visible:after:bg-brand",
                  "data-[resizable-direction=left]:cursor-w-resize data-[resizable-direction=right]:cursor-e-resize",
                )}
              />
            )}
          </>
        ),
      )}
    </ColumnPrimitive>
  );
}

export function TableBody<T extends object>({
  className,
  ...props
}: TableBodyProps<T>) {
  return (
    <TableBodyPrimitive
      data-slot="table-body"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "data-empty:h-28 data-empty:text-center data-empty:text-muted-foreground",
      )}
    />
  );
}

export function Row<T extends object>({
  id,
  columns,
  children,
  className,
  ...props
}: RowProps<T>) {
  const { selectionBehavior } = useTableOptions();
  const { density, striped, divided, bleed } = useContext(TableStyleContext);
  return (
    <RowPrimitive
      data-slot="table-row"
      id={id}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/row outline-none transition-colors data-hovered:bg-muted/40 data-selected:bg-accent/60",
          "data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset",
          "[&:last-child>*]:border-b-0",
          !divided && "[&>*]:border-b-transparent",
          striped && "even:bg-muted/30",
        ),
      )}
    >
      {selectionBehavior === "toggle" && (
        <CellPrimitive
          className={cn(
            "border-b align-middle",
            cellPadding[density],
            bleed && bleedEdges,
          )}
        >
          <Checkbox slot="selection" />
        </CellPrimitive>
      )}
      <Collection items={columns}>{children}</Collection>
    </RowPrimitive>
  );
}

export function Cell({ className, ...props }: CellProps) {
  const { density, bordered, resizable, bleed } = useContext(TableStyleContext);
  return (
    <CellPrimitive
      data-slot="table-cell"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "whitespace-nowrap border-b align-middle outline-none data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset",
          cellPadding[density],
          bordered && "border-r last:border-r-0",
          resizable && "truncate",
          bleed && bleedEdges,
        ),
      )}
    />
  );
}

/**
 * Infinite scrolling: place as the last child of `TableBody`. When it scrolls
 * into view (inside a scroll container with a fixed height) it calls
 * `onLoadMore`; while `isLoading` it shows a spinner row.
 */
export function TableLoadMore({
  className,
  children,
  ...props
}: TableLoadMoreItemProps) {
  return (
    <TableLoadMoreItem
      data-slot="table-load-more"
      {...props}
      className={cn("h-12 text-center", className)}
    >
      {children ?? (
        <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
          <Spinner size="sm" /> Loading more…
        </span>
      )}
    </TableLoadMoreItem>
  );
}

/**
 * Chevron toggle for expandable rows. Put it in the first cell and render the
 * detail as an extra `Row` with one `Cell colSpan={columns}` when expanded.
 */
export function TableExpandButton({
  isExpanded,
  className,
  ...props
}: RACButtonProps & { isExpanded: boolean }) {
  return (
    <RACButton
      data-slot="table-expand-button"
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Collapse row" : "Expand row"}
      {...props}
      className={composeTailwindRenderProps(
        className,
        "inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors data-hovered:bg-muted data-hovered:text-foreground data-focus-visible:ring-2 data-focus-visible:ring-ring/30",
      )}
    >
      <ChevronRightIcon
        aria-hidden
        className={cn(
          "size-4 transition-transform duration-150",
          isExpanded && "rotate-90",
        )}
      />
    </RACButton>
  );
}
