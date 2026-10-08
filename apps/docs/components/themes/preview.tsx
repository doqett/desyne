"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  ArrowUpRightIcon,
  BellIcon,
  CopyIcon,
  CreditCardIcon,
  DownloadIcon,
  EllipsisIcon,
  LayoutGridIcon,
  ListIcon,
  MailIcon,
  PlusIcon,
  SettingsIcon,
  Trash2Icon,
  TrendingUpIcon,
  UserPlusIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { UNSAFE_PortalProvider } from "react-aria";
import { Form } from "react-aria-components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Select, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { Design, Mode } from "@/lib/design";
import { cn } from "@/lib/utils";
import { applyPreviewDesign } from "./fonts";

// Charts pull in recharts; load them on their own so routes that link here
// (and prefetch this page) don't download it up front.
const RevenueChart = lazy(() =>
  import("./preview-charts").then((m) => ({ default: m.RevenueChart })),
);
const TrafficChart = lazy(() =>
  import("./preview-charts").then((m) => ({ default: m.TrafficChart })),
);

/**
 * The live preview: a dashboard made only of library components, themed by
 * inline variables on this subtree. Menus, selects and dialogs portal into a
 * container inside it, so overlays pick up the design too.
 */
export function ThemePreview({
  design,
  mode,
  className,
}: {
  design: Design;
  mode: Mode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const portal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) applyPreviewDesign(ref.current, design, mode);
  }, [design, mode]);

  return (
    <div
      ref={ref}
      data-theme-preview
      className={cn(
        "@container relative isolate min-w-0 rounded-2xl border bg-background p-3 text-foreground sm:p-4",
        mode === "dark" && "dark",
        className,
      )}
    >
      <UNSAFE_PortalProvider getContainer={() => portal.current}>
        <div className="columns-1 gap-4 @2xl:columns-2 @4xl:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          <RevenueCard />
          <CreateAccountCard />
          <PaymentsCard />
          <CalendarCard />
          <TeamCard />
          <ActivityCard />
          <NotificationsCard />
          <UsageCard />
          <SettingsCard />
        </div>
      </UNSAFE_PortalProvider>
      <div ref={portal} className="contents" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RevenueCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Total revenue</CardDescription>
        <CardTitle className="font-semibold text-2xl tabular-nums tracking-(--heading-tracking)">
          $45,231.89
        </CardTitle>
        <CardAction>
          <Badge color="success" variant="soft">
            <TrendingUpIcon /> +20.1%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="h-36 w-full" />}>
          <RevenueChart />
        </Suspense>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function CreateAccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <Form
        className="contents"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account created", {
            description: "Welcome aboard. Check your inbox to verify.",
          });
        }}
      >
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <GitHubMark /> GitHub
            </Button>
            <Button variant="outline">
              <GoogleMark /> Google
            </Button>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-xs uppercase">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <TextField
            label="Email"
            type="email"
            placeholder="you@company.com"
            defaultValue="sofia@northwind.dev"
          />
          <Select label="Role" defaultSelectedKey="design">
            <SelectItem id="design">Designer</SelectItem>
            <SelectItem id="eng">Engineer</SelectItem>
            <SelectItem id="pm">Product manager</SelectItem>
            <SelectItem id="founder">Founder</SelectItem>
          </Select>
          <Checkbox defaultSelected>
            I agree to the terms and privacy policy
          </Checkbox>
        </CardContent>
        <CardFooter>
          <Button type="submit" color="brand" className="w-full">
            Create account
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

const payments = [
  { id: "1", email: "ken99@yahoo.com", status: "Paid", amount: 316 },
  { id: "2", email: "abe45@gmail.com", status: "Paid", amount: 242 },
  { id: "3", email: "monserrat44@gmail.com", status: "Pending", amount: 837 },
  { id: "4", email: "silas22@gmail.com", status: "Failed", amount: 874 },
  { id: "5", email: "carmella@hotmail.com", status: "Paid", amount: 721 },
];

const statusTone = {
  Paid: "success",
  Pending: "warning",
  Failed: "danger",
} as const;

function PaymentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>Recent transactions from your store.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            <DownloadIcon /> Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table aria-label="Payments">
          <TableHeader>
            <Column isRowHeader>Customer</Column>
            <Column>Status</Column>
            <Column className="text-right">Amount</Column>
            <Column className="w-10">
              <span className="sr-only">Actions</span>
            </Column>
          </TableHeader>
          <TableBody items={payments}>
            {(p) => (
              <Row>
                <Cell className="max-w-36 truncate">{p.email}</Cell>
                <Cell>
                  <Badge variant="dot" color={statusTone[p.status as "Paid"]}>
                    {p.status}
                  </Badge>
                </Cell>
                <Cell className="text-right tabular-nums">
                  ${p.amount.toFixed(2)}
                </Cell>
                <Cell>
                  <RowMenu />
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RowMenu() {
  return (
    <MenuTrigger>
      <Button variant="ghost" size="icon-sm" aria-label="Payment actions">
        <EllipsisIcon />
      </Button>
      <MenuContent placement="bottom end" className="w-56">
        <MenuItem textValue="Copy payment ID">
          <CopyIcon /> Copy payment ID <MenuShortcut>⌘C</MenuShortcut>
        </MenuItem>
        <MenuItem textValue="View customer">
          <ArrowUpRightIcon /> View customer
        </MenuItem>
        <MenuItem textValue="Payment details">
          <CreditCardIcon /> Payment details
        </MenuItem>
        <MenuSeparator />
        <MenuItem textValue="Refund" variant="destructive">
          <Trash2Icon /> Refund
        </MenuItem>
      </MenuContent>
    </MenuTrigger>
  );
}

/* ------------------------------------------------------------------ */

function CalendarCard() {
  return (
    <Card className="items-center">
      <CardContent className="flex justify-center">
        <Calendar
          aria-label="Meeting date"
          defaultValue={today(getLocalTimeZone()).add({ days: 2 })}
        />
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

const members = [
  { name: "Sofia Davis", email: "m@example.com", role: "owner" },
  { name: "Jackson Lee", email: "p@example.com", role: "member" },
  { name: "Isabella Nguyen", email: "i@example.com", role: "viewer" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

function TeamCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Invite your team to collaborate.</CardDescription>
        <CardAction>
          <InviteDialog />
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-3">
            <Avatar colorful alt={m.name} fallback={initials(m.name)} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-sm leading-tight">
                {m.name}
              </p>
              <p className="truncate text-muted-foreground text-xs">
                {m.email}
              </p>
            </div>
            <Select
              aria-label={`Role for ${m.name}`}
              defaultSelectedKey={m.role}
              className="w-28"
            >
              <SelectItem id="owner">Owner</SelectItem>
              <SelectItem id="member">Member</SelectItem>
              <SelectItem id="viewer">Viewer</SelectItem>
            </Select>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-between border-t pt-4">
        <AvatarGroup max={4} role="group" aria-label="7 watchers">
          {[
            "Olivia Martin",
            "William Kim",
            "Lucas Brown",
            "Mia Chen",
            "Noah Park",
            "Ava Reed",
            "Leo Silva",
          ].map((n) => (
            <Avatar key={n} colorful alt={n} fallback={n[0]} />
          ))}
        </AvatarGroup>
        <span className="text-muted-foreground text-xs">7 watching</span>
      </CardFooter>
    </Card>
  );
}

function InviteDialog() {
  return (
    <DialogTrigger>
      <Button size="sm" variant="outline">
        <UserPlusIcon /> Invite
      </Button>
      <DialogContent>
        {({ close }) => (
          <Form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              close();
              toast("Invitation sent", {
                description: "They'll get an email with a link to join.",
              });
            }}
          >
            <DialogHeader>
              <DialogTitle>Invite a teammate</DialogTitle>
              <DialogDescription>
                They'll get access to every project in this workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <TextField
                label="Email"
                type="email"
                placeholder="name@company.com"
                autoFocus
              />
              <Select label="Role" defaultSelectedKey="member">
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="member">Member</SelectItem>
                <SelectItem id="viewer">Viewer</SelectItem>
              </Select>
            </div>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button type="submit" color="brand">
                Send invite
              </Button>
            </DialogFooter>
          </Form>
        )}
      </DialogContent>
    </DialogTrigger>
  );
}

/* ------------------------------------------------------------------ */

const traffic = [
  { day: "Mon", visits: 186 },
  { day: "Tue", visits: 305 },
  { day: "Wed", visits: 237 },
  { day: "Thu", visits: 273 },
  { day: "Fri", visits: 209 },
  { day: "Sat", visits: 114 },
  { day: "Sun", visits: 142 },
];

function ActivityCard() {
  const [view, setView] = useState("chart");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Visits to your workspace.</CardDescription>
        <CardAction>
          <ToggleButtonGroup
            aria-label="View"
            variant="segmented"
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[view]}
            onSelectionChange={(keys) => setView(String([...keys][0]))}
          >
            <ToggleButton id="chart" aria-label="Chart view">
              <LayoutGridIcon />
            </ToggleButton>
            <ToggleButton id="list" aria-label="List view">
              <ListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs defaultSelectedKey="week" variant="segmented" size="sm">
          <TabList aria-label="Range">
            <Tab id="week">This week</Tab>
            <Tab id="month">Month</Tab>
            <Tab id="year">Year</Tab>
          </TabList>
          {["week", "month", "year"].map((range) => (
            <TabPanel key={range} id={range}>
              {view === "chart" ? (
                <Suspense fallback={<div className="h-32 w-full" />}>
                  <TrafficChart data={scaled(range)} />
                </Suspense>
              ) : (
                <ul className="grid gap-1.5 text-sm">
                  {scaled(range)
                    .slice(0, 4)
                    .map((t) => (
                      <li
                        key={t.day}
                        className="flex items-center justify-between rounded-(--radius-control) bg-muted px-3 py-1.5"
                      >
                        <span>{t.day}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {t.visits.toLocaleString("en-US")} visits
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </TabPanel>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

const scaled = (range: string) =>
  range === "week"
    ? traffic
    : traffic.map((t, i) => ({
        ...t,
        visits: Math.round(
          t.visits * (range === "month" ? 3.1 : 12.4) + i * 40,
        ),
      }));

/* ------------------------------------------------------------------ */

function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <BellIcon /> Notifications
        </CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Badge color="brand" variant="solid" size="sm">
            3 new
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Alert color="brand" showIcon>
          <AlertTitle>Deployment ready</AlertTitle>
          <AlertDescription>
            Preview for <span className="font-mono">feat/themes</span> built in
            42s.
          </AlertDescription>
        </Alert>
        <Alert color="warning" showIcon>
          <AlertTitle>Usage at 80%</AlertTitle>
          <AlertDescription>
            Upgrade before Friday to avoid throttling.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="soft" className="flex-1">
          <MailIcon /> Mark all read
        </Button>
        <Button variant="outline" size="icon" aria-label="Settings">
          <SettingsIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function UsageCard() {
  const [seats, setSeats] = useState(12);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan usage</CardTitle>
        <CardDescription>Team plan · renews on Nov 1</CardDescription>
        <CardAction>
          <Badge variant="outline" color="brand">
            Team
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5">
        <ProgressBar label="Storage" value={68} valueLabel="6.8 of 10 GB" />
        <ProgressBar
          label="API requests"
          value={34}
          valueLabel="34k of 100k"
          color="success"
        />
        <Slider
          label="Seats"
          minValue={1}
          maxValue={50}
          value={seats}
          onChange={(v) => setSeats(v as number)}
        />
      </CardContent>
      <CardFooter className="justify-between border-t pt-4">
        <p className="text-sm">
          <span className="font-semibold tabular-nums">${seats * 12}</span>
          <span className="text-muted-foreground"> / month</span>
        </p>
        <Button size="sm" color="brand">
          <PlusIcon /> Upgrade
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

const prefs = [
  { label: "Product updates", hint: "New features and releases.", on: true },
  { label: "Weekly digest", hint: "A summary every Monday.", on: false },
  { label: "Security alerts", hint: "Sign-ins from new devices.", on: true },
];

function SettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Manage how we contact you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3.5">
          {prefs.map((p) => (
            <div key={p.label} className="flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm leading-tight">{p.label}</p>
                <p className="text-muted-foreground text-xs">{p.hint}</p>
              </div>
              <Switch aria-label={p.label} defaultSelected={p.on} />
            </div>
          ))}
        </div>
        <div className="h-px bg-border" />
        <RadioGroup label="Email frequency" defaultValue="daily">
          <Radio value="instant">Instantly</Radio>
          <Radio value="daily">Once a day</Radio>
          <Radio value="never">Never</Radio>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
