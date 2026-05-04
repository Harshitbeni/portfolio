"use client";

import type { ComponentType } from "react";
import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/CentralIconBase";
import { IconArrowRight } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconArrowRight";
import { IconArrowRotateCounterClockwise } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconArrowRotateCounterClockwise";
import { IconBell } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconBell";
import { IconBrain } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconBrain";
import { IconChainLink1 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconChainLink1";
import { IconCheckmark1Small } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconCheckmark1Small";
import { IconChevronRight } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconChevronRight";
import { IconCircle } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconCircle";
import { IconCircleDotsCenter1 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconCircleDotsCenter1";
import { IconClipboard2 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconClipboard2";
import { IconClock } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconClock";
import { IconColorPalette } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconColorPalette";
import { IconEmail1 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconEmail1";
import { IconFormRectangle } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconFormRectangle";
import { IconGlobe } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconGlobe";
import { IconHeart } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconHeart";
import { IconImages1 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconImages1";
import { IconLibrary as IconLibraryBooks } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconLibrary";
import { IconLightBulb } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconLightbulb";
import { IconLoader } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconLoader";
import { IconLock } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconLock";
import { IconMoon } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconMoon";
import { IconPageSearch } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPageSearch";
import { IconPaintBrush } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPaintbrush";
import { IconPause } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPause";
import { IconPlay } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPlay";
import { IconPlusSmall } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPlusSmall";
import { IconRocket } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconRocket";
import { IconSettingsGear1 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSettingsGear1";
import { IconShield } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconShield";
import { IconSidebar } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSidebar";
import { IconStar } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconStar";
import { IconStudioDisplay } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconStudioDisplay";
import { IconSun } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSun";
import { IconUser } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconUser";
import { IconUserGroup } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconUserGroup";
import { IconX } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconX";

type CentralIcon = ComponentType<CentralIconBaseProps>;

export interface IconComponentProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export type IconComponent = ComponentType<IconComponentProps>;

function fluidIcon(Icon: CentralIcon): IconComponent {
  return Icon as unknown as IconComponent;
}

export type IconLibrary = "central";

export type IconName =
  | "chevron-right"
  | "x"
  | "copy"
  | "menu"
  | "dot"
  | "monitor"
  | "sun"
  | "moon"
  | "rectangle-horizontal"
  | "circle"
  | "square-library"
  | "clock"
  | "star"
  | "settings"
  | "plus"
  | "arrow-right"
  | "search"
  | "loader"
  | "users"
  | "lock"
  | "mail"
  | "bell"
  | "shield"
  | "palette"
  | "lightbulb"
  | "rocket"
  | "heart"
  | "paintbrush"
  | "brain"
  | "globe"
  | "user"
  | "image"
  | "link"
  | "check"
  | "rotate-ccw"
  | "play"
  | "pause";

export const iconLibraryOrder: IconLibrary[] = ["central"];

export const iconLibraryLabels: Record<IconLibrary, string> = {
  central: "Central",
};

const centralMap: Record<IconName, IconComponent> = {
  "chevron-right": fluidIcon(IconChevronRight),
  x: fluidIcon(IconX),
  copy: fluidIcon(IconClipboard2),
  menu: fluidIcon(IconSidebar),
  dot: fluidIcon(IconCircleDotsCenter1),
  monitor: fluidIcon(IconStudioDisplay),
  sun: fluidIcon(IconSun),
  moon: fluidIcon(IconMoon),
  "rectangle-horizontal": fluidIcon(IconFormRectangle),
  circle: fluidIcon(IconCircle),
  "square-library": fluidIcon(IconLibraryBooks),
  clock: fluidIcon(IconClock),
  star: fluidIcon(IconStar),
  settings: fluidIcon(IconSettingsGear1),
  plus: fluidIcon(IconPlusSmall),
  "arrow-right": fluidIcon(IconArrowRight),
  search: fluidIcon(IconPageSearch),
  loader: fluidIcon(IconLoader),
  users: fluidIcon(IconUserGroup),
  lock: fluidIcon(IconLock),
  mail: fluidIcon(IconEmail1),
  bell: fluidIcon(IconBell),
  shield: fluidIcon(IconShield),
  palette: fluidIcon(IconColorPalette),
  lightbulb: fluidIcon(IconLightBulb),
  rocket: fluidIcon(IconRocket),
  heart: fluidIcon(IconHeart),
  paintbrush: fluidIcon(IconPaintBrush),
  brain: fluidIcon(IconBrain),
  globe: fluidIcon(IconGlobe),
  user: fluidIcon(IconUser),
  image: fluidIcon(IconImages1),
  link: fluidIcon(IconChainLink1),
  check: fluidIcon(IconCheckmark1Small),
  "rotate-ccw": fluidIcon(IconArrowRotateCounterClockwise),
  play: fluidIcon(IconPlay),
  pause: fluidIcon(IconPause),
};

export const iconMap: Record<IconLibrary, Record<IconName, IconComponent>> = {
  central: centralMap,
};
