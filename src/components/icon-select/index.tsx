import { CheckIcon, LucideProps } from "lucide-react";
import { RegisterOptions } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { icons } from "lucide-react";
import { Button } from "../ui/button";
export default function IconSelect({
  field,
  form,
}: {
  form: any;
  field: RegisterOptions;
}) {
  console.log(iconNames);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? iconNames.find((icon) => icon === field.value)
              : "Select Icon"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup className="h-60 overflow-y-auto">
            {iconNames.map((icon) => {
              const Icon = icons[icon];

              return (
                <CommandItem
                  value={icon}
                  key={icon}
                  className="flex items-center gap-2"
                  onSelect={() => {
                    form.setValue("icon", icon);
                  }}
                >
                  {Icon && <Icon />}
                  {icon.substring(0, 10) + "..."}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      icon === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const Icon = ({
  name,
  color,
  size,
}: {
  name: keyof typeof icons;
  color?: LucideProps["color"];
  size?: LucideProps["size"];
}) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

const iconNames = [
  "Accessibility",
  "Activity",
  "ActivitySquare",
  "AirVent",
  "Airplay",
  "AlarmClock",
  "AlarmClockCheck",
  "AlarmClockOff",
  "AlarmMinus",
  "AlarmPlus",
  "AlarmSmoke",
  "Album",
  "AlertCircle",
  "AlertOctagon",
  "AlertTriangle",
  "AlignCenter",
  "AlignCenterHorizontal",
  "AlignCenterVertical",
  "AlignEndHorizontal",
  "AlignEndVertical",
  "AlignHorizontalDistributeCenter",
  "AlignHorizontalDistributeEnd",
  "AlignHorizontalDistributeStart",
  "AlignHorizontalJustifyCenter",
  "AlignHorizontalJustifyEnd",
  "AlignHorizontalJustifyStart",
  "AlignHorizontalSpaceAround",
  "AlignHorizontalSpaceBetween",
  "AlignJustify",
  "AlignLeft",
  "AlignRight",
  "AlignStartHorizontal",
  "AlignStartVertical",
  "AlignVerticalDistributeCenter",
  "AlignVerticalDistributeEnd",
  "AlignVerticalDistributeStart",
  "AlignVerticalJustifyCenter",
  "AlignVerticalJustifyEnd",
  "AlignVerticalJustifyStart",
  "AlignVerticalSpaceAround",
  "AlignVerticalSpaceBetween",
  "Ampersand",
  "Ampersands",
  "Anchor",
  "Angry",
  "Annoyed",
  "Antenna",
  "Aperture",
  "AppWindow",
  "Apple",
  "Archive",
  "ArchiveRestore",
  "ArchiveX",
  "AreaChart",
  "Armchair",
  "ArrowBigDown",
  "ArrowBigDownDash",
  "ArrowBigLeft",
  "ArrowBigLeftDash",
  "ArrowBigRight",
  "ArrowBigRightDash",
  "ArrowBigUp",
  "ArrowBigUpDash",
  "ArrowDown",
  "ArrowDown01",
  "ArrowDown10",
  "ArrowDownAZ",
  "ArrowDownCircle",
  "ArrowDownFromLine",
  "ArrowDownLeft",
  "ArrowDownLeftFromCircle",
  "ArrowDownLeftSquare",
  "ArrowDownNarrowWide",
  "ArrowDownRight",
  "ArrowDownRightFromCircle",
  "ArrowDownRightSquare",
  "ArrowDownSquare",
  "ArrowDownToDot",
  "ArrowDownToLine",
  "ArrowDownUp",
  "ArrowDownWideNarrow",
  "ArrowDownZA",
  "ArrowLeft",
  "ArrowLeftCircle",
  "ArrowLeftFromLine",
  "ArrowLeftRight",
  "ArrowLeftSquare",
  "ArrowLeftToLine",
  "ArrowRight",
  "ArrowRightCircle",
  "ArrowRightFromLine",
  "ArrowRightLeft",
  "ArrowRightSquare",
  "ArrowRightToLine",
  "ArrowUp",
  "ArrowUp01",
  "ArrowUp10",
  "ArrowUpAZ",
  "ArrowUpCircle",
  "ArrowUpDown",
  "ArrowUpFromDot",
  "ArrowUpFromLine",
  "ArrowUpLeft",
  "ArrowUpLeftFromCircle",
  "ArrowUpLeftSquare",
  "ArrowUpNarrowWide",
  "ArrowUpRight",
  "ArrowUpRightFromCircle",
  "ArrowUpRightSquare",
  "ArrowUpSquare",
  "ArrowUpToLine",
  "ArrowUpWideNarrow",
  "ArrowUpZA",
  "ArrowsUpFromLine",
  "Asterisk",
  "AtSign",
  "Atom",
  "AudioLines",
  "AudioWaveform",
  "Award",
  "Axe",
  "Axis3d",
  "Baby",
  "Backpack",
  "Badge",
  "BadgeAlert",
  "BadgeCent",
  "BadgeCheck",
  "BadgeDollarSign",
  "BadgeEuro",
  "BadgeHelp",
  "BadgeIndianRupee",
  "BadgeInfo",
  "BadgeJapaneseYen",
  "BadgeMinus",
  "BadgePercent",
  "BadgePlus",
  "BadgePoundSterling",
  "BadgeRussianRuble",
  "BadgeSwissFranc",
  "BadgeX",
  "BaggageClaim",
  "Ban",
  "Banana",
  "Banknote",
  "BarChart",
  "BarChart2",
  "BarChart3",
  "BarChart4",
  "BarChartBig",
  "BarChartHorizontal",
  "BarChartHorizontalBig",
  "Barcode",
  "Baseline",
  "Bath",
  "Battery",
  "BatteryCharging",
  "BatteryFull",
  "BatteryLow",
  "BatteryMedium",
  "BatteryWarning",
  "Beaker",
  "Bean",
  "BeanOff",
  "Bed",
  "BedDouble",
  "BedSingle",
  "Beef",
  "Beer",
  "Bell",
  "BellDot",
  "BellElectric",
  "BellMinus",
  "BellOff",
  "BellPlus",
  "BellRing",
  "Bike",
  "Binary",
  "Biohazard",
  "Bird",
  "Bitcoin",
  "Blinds",
  "Blocks",
  "Bluetooth",
  "BluetoothConnected",
  "BluetoothOff",
  "BluetoothSearching",
  "Bold",
  "Bomb",
  "Bone",
  "Book",
  "BookA",
  "BookAudio",
  "BookCheck",
  "BookCopy",
  "BookDashed",
  "BookDown",
  "BookHeadphones",
  "BookHeart",
  "BookImage",
  "BookKey",
  "BookLock",
  "BookMarked",
  "BookMinus",
  "BookOpen",
  "BookOpenCheck",
  "BookOpenText",
  "BookPlus",
  "BookText",
  "BookType",
  "BookUp",
  "BookUp2",
  "BookUser",
  "BookX",
  "Bookmark",
  "BookmarkCheck",
  "BookmarkMinus",
  "BookmarkPlus",
  "BookmarkX",
  "BoomBox",
  "Bot",
  "Box",
  "BoxSelect",
  "Boxes",
  "Braces",
  "Brackets",
  "Brain",
  "BrainCircuit",
  "BrainCog",
  "Briefcase",
  "BringToFront",
  "Brush",
  "Bug",
  "BugOff",
  "BugPlay",
  "Building",
  "Building2",
  "Bus",
  "BusFront",
  "Cable",
  "CableCar",
  "Cake",
  "CakeSlice",
  "Calculator",
  "Calendar",
  "CalendarCheck",
  "CalendarCheck2",
  "CalendarClock",
  "CalendarDays",
  "CalendarHeart",
  "CalendarMinus",
  "CalendarOff",
  "CalendarPlus",
  "CalendarRange",
  "CalendarSearch",
  "CalendarX",
  "CalendarX2",
  "Camera",
  "CameraOff",
  "CandlestickChart",
  "Candy",
  "CandyCane",
  "CandyOff",
  "Car",
  "CarFront",
  "CarTaxiFront",
  "Caravan",
  "Carrot",
  "CaseLower",
  "CaseSensitive",
  "CaseUpper",
  "CassetteTape",
  "Cast",
  "Castle",
  "Cat",
  "Cctv",
  "Check",
  "CheckCheck",
  "CheckCircle",
  "CheckCircle2",
  "CheckSquare",
  "CheckSquare2",
  "ChefHat",
  "Cherry",
  "ChevronDown",
  "ChevronDownCircle",
  "ChevronDownSquare",
  "ChevronFirst",
  "ChevronLast",
  "ChevronLeft",
  "ChevronLeftCircle",
  "ChevronLeftSquare",
  "ChevronRight",
  "ChevronRightCircle",
  "ChevronRightSquare",
  "ChevronUp",
  "ChevronUpCircle",
  "ChevronUpSquare",
  "ChevronsDown",
  "ChevronsDownUp",
  "ChevronsLeft",
  "ChevronsLeftRight",
  "ChevronsRight",
  "ChevronsRightLeft",
  "ChevronsUp",
  "ChevronsUpDown",
  "Chrome",
  "Church",
  "Cigarette",
  "CigaretteOff",
  "Circle",
  "CircleDashed",
  "CircleDollarSign",
  "CircleDot",
  "CircleDotDashed",
  "CircleEllipsis",
  "CircleEqual",
  "CircleOff",
  "CircleSlash",
  "CircleSlash2",
  "CircleUser",
  "CircleUserRound",
  "CircuitBoard",
  "Citrus",
  "Clapperboard",
  "Clipboard",
  "ClipboardCheck",
  "ClipboardCopy",
  "ClipboardEdit",
  "ClipboardList",
  "ClipboardPaste",
  "ClipboardSignature",
  "ClipboardType",
  "ClipboardX",
  "Clock",
  "Clock1",
  "Clock10",
  "Clock11",
  "Clock12",
  "Clock2",
  "Clock3",
  "Clock4",
  "Clock5",
  "Clock6",
  "Clock7",
  "Clock8",
  "Clock9",
  "Cloud",
  "CloudCog",
  "CloudDrizzle",
  "CloudFog",
  "CloudHail",
  "CloudLightning",
  "CloudMoon",
  "CloudMoonRain",
  "CloudOff",
  "CloudRain",
  "CloudRainWind",
  "CloudSnow",
  "CloudSun",
  "CloudSunRain",
  "Cloudy",
  "Clover",
  "Club",
  "Code",
  "Code2",
  "Codepen",
  "Codesandbox",
  "Coffee",
  "Cog",
  "Coins",
  "Columns",
  "Combine",
  "Command",
  "Compass",
  "Component",
  "Computer",
  "ConciergeBell",
  "Cone",
  "Construction",
  "Contact",
  "Contact2",
  "Container",
  "Contrast",
  "Cookie",
  "Copy",
  "CopyCheck",
  "CopyMinus",
  "CopyPlus",
  "CopySlash",
  "CopyX",
  "Copyleft",
  "Copyright",
  "CornerDownLeft",
  "CornerDownRight",
  "CornerLeftDown",
  "CornerLeftUp",
  "CornerRightDown",
  "CornerRightUp",
  "CornerUpLeft",
  "CornerUpRight",
  "Cpu",
  "CreativeCommons",
  "CreditCard",
  "Croissant",
  "Crop",
  "Cross",
  "Crosshair",
  "Crown",
  "Cuboid",
  "CupSoda",
  "Currency",
  "Cylinder",
  "Database",
  "DatabaseBackup",
  "DatabaseZap",
  "Delete",
  "Dessert",
  "Diameter",
  "Diamond",
  "Dice1",
  "Dice2",
  "Dice3",
  "Dice4",
  "Dice5",
  "Dice6",
  "Dices",
  "Diff",
  "Disc",
  "Disc2",
  "Disc3",
  "DiscAlbum",
  "Divide",
  "DivideCircle",
  "DivideSquare",
  "Dna",
  "DnaOff",
  "Dog",
  "DollarSign",
  "Donut",
  "DoorClosed",
  "DoorOpen",
  "Dot",
  "Download",
  "DownloadCloud",
  "DraftingCompass",
  "Drama",
  "Dribbble",
  "Droplet",
  "Droplets",
  "Drum",
  "Drumstick",
  "Dumbbell",
  "Ear",
  "EarOff",
  "Egg",
  "EggFried",
  "EggOff",
  "Equal",
  "EqualNot",
  "Eraser",
  "Euro",
  "Expand",
  "ExternalLink",
  "Eye",
  "EyeOff",
  "Facebook",
  "Factory",
  "Fan",
  "FastForward",
  "Feather",
  "FerrisWheel",
  "Figma",
  "File",
  "FileArchive",
  "FileAudio",
  "FileAudio2",
  "FileAxis3d",
  "FileBadge",
  "FileBadge2",
  "FileBarChart",
  "FileBarChart2",
  "FileBox",
  "FileCheck",
  "FileCheck2",
  "FileClock",
  "FileCode",
  "FileCode2",
  "FileCog",
  "FileDiff",
  "FileDigit",
  "FileDown",
  "FileEdit",
  "FileHeart",
  "FileImage",
  "FileInput",
  "FileJson",
  "FileJson2",
  "FileKey",
  "FileKey2",
  "FileLineChart",
  "FileLock",
  "FileLock2",
  "FileMinus",
  "FileMinus2",
  "FileMusic",
  "FileOutput",
  "FilePieChart",
  "FilePlus",
  "FilePlus2",
  "FileQuestion",
  "FileScan",
  "FileSearch",
  "FileSearch2",
  "FileSignature",
  "FileSpreadsheet",
  "FileStack",
  "FileSymlink",
  "FileTerminal",
  "FileText",
  "FileType",
  "FileType2",
  "FileUp",
  "FileVideo",
  "FileVideo2",
  "FileVolume",
  "FileVolume2",
  "FileWarning",
  "FileX",
  "FileX2",
  "Files",
  "Film",
  "Filter",
  "FilterX",
  "Fingerprint",
  "FireExtinguisher",
  "Fish",
  "FishOff",
  "FishSymbol",
  "Flag",
  "FlagOff",
  "FlagTriangleLeft",
  "FlagTriangleRight",
  "Flame",
  "FlameKindling",
  "Flashlight",
  "FlashlightOff",
  "FlaskConical",
  "FlaskConicalOff",
  "FlaskRound",
  "FlipHorizontal",
  "FlipHorizontal2",
  "FlipVertical",
  "FlipVertical2",
  "Flower",
  "Flower2",
  "Focus",
  "FoldHorizontal",
  "FoldVertical",
  "Folder",
  "FolderArchive",
  "FolderCheck",
  "FolderClock",
  "FolderClosed",
  "FolderCog",
  "FolderDot",
  "FolderDown",
  "FolderEdit",
  "FolderGit",
  "FolderGit2",
  "FolderHeart",
  "FolderInput",
  "FolderKanban",
  "FolderKey",
  "FolderLock",
  "FolderMinus",
  "FolderOpen",
  "FolderOpenDot",
  "FolderOutput",
  "FolderPlus",
  "FolderRoot",
  "FolderSearch",
  "FolderSearch2",
  "FolderSymlink",
  "FolderSync",
  "FolderTree",
  "FolderUp",
  "FolderX",
  "Folders",
  "Footprints",
  "Forklift",
  "FormInput",
  "Forward",
  "Frame",
  "Framer",
  "Frown",
  "Fuel",
  "Fullscreen",
  "FunctionSquare",
  "GalleryHorizontal",
  "GalleryHorizontalEnd",
  "GalleryThumbnails",
  "GalleryVertical",
  "GalleryVerticalEnd",
  "Gamepad",
  "Gamepad2",
  "GanttChart",
  "GanttChartSquare",
  "Gauge",
  "GaugeCircle",
  "Gavel",
  "Gem",
  "Ghost",
  "Gift",
  "GitBranch",
  "GitBranchPlus",
  "GitCommitHorizontal",
  "GitCommitVertical",
  "GitCompare",
  "GitCompareArrows",
  "GitFork",
  "GitGraph",
  "GitMerge",
  "GitPullRequest",
  "GitPullRequestArrow",
  "GitPullRequestClosed",
  "GitPullRequestCreate",
  "GitPullRequestCreateArrow",
  "GitPullRequestDraft",
  "Github",
  "Gitlab",
  "GlassWater",
  "Glasses",
  "Globe",
  "Globe2",
  "Goal",
  "Grab",
  "GraduationCap",
  "Grape",
  "Grid2x2",
  "Grid3x3",
  "Grip",
  "GripHorizontal",
  "GripVertical",
  "Group",
  "Guitar",
  "Hammer",
  "Hand",
  "HandMetal",
  "HardDrive",
  "HardDriveDownload",
  "HardDriveUpload",
  "HardHat",
  "Hash",
  "Haze",
  "HdmiPort",
  "Heading",
  "Heading1",
  "Heading2",
  "Heading3",
  "Heading4",
  "Heading5",
  "Heading6",
  "Headphones",
  "Heart",
  "HeartCrack",
  "HeartHandshake",
  "HeartOff",
  "HeartPulse",
  "HelpCircle",
  "HelpingHand",
  "Hexagon",
  "Highlighter",
  "History",
  "Home",
  "Hop",
  "HopOff",
  "Hotel",
  "Hourglass",
  "IceCream",
  "IceCream2",
  "Image",
  "ImageDown",
  "ImageMinus",
  "ImageOff",
  "ImagePlus",
  "Import",
  "Inbox",
  "Indent",
  "IndianRupee",
  "Infinity",
  "Info",
  "Instagram",
  "Italic",
  "IterationCcw",
  "IterationCw",
  "JapaneseYen",
  "Joystick",
  "Kanban",
  "KanbanSquare",
  "KanbanSquareDashed",
  "Key",
  "KeyRound",
  "KeySquare",
  "Keyboard",
  "KeyboardMusic",
  "Lamp",
  "LampCeiling",
  "LampDesk",
  "LampFloor",
  "LampWallDown",
  "LampWallUp",
  "LandPlot",
  "Landmark",
  "Languages",
  "Laptop",
  "Laptop2",
  "Lasso",
  "LassoSelect",
  "Laugh",
  "Layers",
  "Layers2",
  "Layers3",
  "Layout",
  "LayoutDashboard",
  "LayoutGrid",
  "LayoutList",
  "LayoutPanelLeft",
  "LayoutPanelTop",
  "LayoutTemplate",
  "Leaf",
  "LeafyGreen",
  "Library",
  "LibraryBig",
  "LibrarySquare",
  "LifeBuoy",
  "Ligature",
  "Lightbulb",
  "LightbulbOff",
  "LineChart",
  "Link",
  "Link2",
  "Link2Off",
  "Linkedin",
  "List",
  "ListChecks",
  "ListEnd",
  "ListFilter",
  "ListMinus",
  "ListMusic",
  "ListOrdered",
  "ListPlus",
  "ListRestart",
  "ListStart",
  "ListTodo",
  "ListTree",
  "ListVideo",
  "ListX",
  "Loader",
  "Loader2",
  "Locate",
  "LocateFixed",
  "LocateOff",
  "Lock",
  "LockKeyhole",
  "LogIn",
  "LogOut",
  "Lollipop",
  "Luggage",
  "MSquare",
  "Magnet",
  "Mail",
  "MailCheck",
  "MailMinus",
  "MailOpen",
  "MailPlus",
  "MailQuestion",
  "MailSearch",
  "MailWarning",
  "MailX",
  "Mailbox",
  "Mails",
  "Map",
  "MapPin",
  "MapPinOff",
  "MapPinned",
  "Martini",
  "Maximize",
  "Maximize2",
  "Medal",
  "Megaphone",
  "MegaphoneOff",
  "Meh",
  "MemoryStick",
  "Menu",
  "MenuSquare",
  "Merge",
  "MessageCircle",
  "MessageCircleCode",
  "MessageCircleDashed",
  "MessageCircleHeart",
  "MessageCircleMore",
  "MessageCircleOff",
  "MessageCirclePlus",
  "MessageCircleQuestion",
  "MessageCircleReply",
  "MessageCircleWarning",
  "MessageCircleX",
  "MessageSquare",
  "MessageSquareCode",
  "MessageSquareDashed",
  "MessageSquareDiff",
  "MessageSquareDot",
  "MessageSquareHeart",
  "MessageSquareMore",
  "MessageSquareOff",
  "MessageSquarePlus",
  "MessageSquareQuote",
  "MessageSquareReply",
  "MessageSquareShare",
  "MessageSquareText",
  "MessageSquareWarning",
  "MessageSquareX",
  "MessagesSquare",
  "Mic",
  "Mic2",
  "MicOff",
  "Microscope",
  "Microwave",
  "Milestone",
  "Milk",
  "MilkOff",
  "Minimize",
  "Minimize2",
  "Minus",
  "MinusCircle",
  "MinusSquare",
  "Monitor",
  "MonitorCheck",
  "MonitorDot",
  "MonitorDown",
  "MonitorOff",
  "MonitorPause",
  "MonitorPlay",
  "MonitorSmartphone",
  "MonitorSpeaker",
  "MonitorStop",
  "MonitorUp",
  "MonitorX",
  "Moon",
  "MoonStar",
  "MoreHorizontal",
  "MoreVertical",
  "Mountain",
  "MountainSnow",
  "Mouse",
  "MousePointer",
  "MousePointer2",
  "MousePointerClick",
  "MousePointerSquare",
  "MousePointerSquareDashed",
  "Move",
  "Move3d",
  "MoveDiagonal",
  "MoveDiagonal2",
  "MoveDown",
  "MoveDownLeft",
  "MoveDownRight",
  "MoveHorizontal",
  "MoveLeft",
  "MoveRight",
  "MoveUp",
  "MoveUpLeft",
  "MoveUpRight",
  "MoveVertical",
  "Music",
  "Music2",
  "Music3",
  "Music4",
  "Navigation",
  "Navigation2",
  "Navigation2Off",
  "NavigationOff",
  "Network",
  "Newspaper",
  "Nfc",
  "Nut",
  "NutOff",
  "Octagon",
  "Option",
  "Orbit",
  "Outdent",
  "Package",
  "Package2",
  "PackageCheck",
  "PackageMinus",
  "PackageOpen",
  "PackagePlus",
  "PackageSearch",
  "PackageX",
  "PaintBucket",
  "Paintbrush",
  "Paintbrush2",
  "Palette",
  "Palmtree",
  "PanelBottom",
  "PanelBottomClose",
  "PanelBottomInactive",
  "PanelBottomOpen",
  "PanelLeft",
  "PanelLeftClose",
  "PanelLeftInactive",
  "PanelLeftOpen",
  "PanelRight",
  "PanelRightClose",
  "PanelRightInactive",
  "PanelRightOpen",
  "PanelTop",
  "PanelTopClose",
  "PanelTopInactive",
  "PanelTopOpen",
  "Paperclip",
  "Parentheses",
  "ParkingCircle",
  "ParkingCircleOff",
  "ParkingMeter",
  "ParkingSquare",
  "ParkingSquareOff",
  "PartyPopper",
  "Pause",
  "PauseCircle",
  "PauseOctagon",
  "PawPrint",
  "PcCase",
  "Pen",
  "PenLine",
  "PenSquare",
  "PenTool",
  "Pencil",
  "PencilLine",
  "PencilRuler",
  "Pentagon",
  "Percent",
  "PercentCircle",
  "PercentDiamond",
  "PercentSquare",
  "PersonStanding",
  "Phone",
  "PhoneCall",
  "PhoneForwarded",
  "PhoneIncoming",
  "PhoneMissed",
  "PhoneOff",
  "PhoneOutgoing",
  "Pi",
  "PiSquare",
  "Piano",
  "PictureInPicture",
  "PictureInPicture2",
  "PieChart",
  "PiggyBank",
  "Pilcrow",
  "PilcrowSquare",
  "Pill",
  "Pin",
  "PinOff",
  "Pipette",
  "Pizza",
  "Plane",
  "PlaneLanding",
  "PlaneTakeoff",
  "Play",
  "PlayCircle",
  "PlaySquare",
  "Plug",
  "Plug2",
  "PlugZap",
  "PlugZap2",
  "Plus",
  "PlusCircle",
  "PlusSquare",
  "Pocket",
  "PocketKnife",
  "Podcast",
  "Pointer",
  "PointerOff",
  "Popcorn",
  "Popsicle",
  "PoundSterling",
  "Power",
  "PowerCircle",
  "PowerOff",
  "PowerSquare",
  "Presentation",
  "Printer",
  "Projector",
  "Puzzle",
  "Pyramid",
  "QrCode",
  "Quote",
  "Rabbit",
  "Radar",
  "Radiation",
  "Radio",
  "RadioReceiver",
  "RadioTower",
  "Radius",
  "RailSymbol",
  "Rainbow",
  "Rat",
  "Ratio",
  "Receipt",
  "RectangleHorizontal",
  "RectangleVertical",
  "Recycle",
  "Redo",
  "Redo2",
  "RedoDot",
  "RefreshCcw",
  "RefreshCcwDot",
  "RefreshCw",
  "RefreshCwOff",
  "Refrigerator",
  "Regex",
  "RemoveFormatting",
  "Repeat",
  "Repeat1",
  "Repeat2",
  "Replace",
  "ReplaceAll",
  "Reply",
  "ReplyAll",
  "Rewind",
  "Ribbon",
  "Rocket",
  "RockingChair",
  "RollerCoaster",
  "Rotate3d",
  "RotateCcw",
  "RotateCw",
  "Route",
  "RouteOff",
  "Router",
  "Rows",
  "Rss",
  "Ruler",
  "RussianRuble",
  "Sailboat",
  "Salad",
  "Sandwich",
  "Satellite",
  "SatelliteDish",
  "Save",
  "SaveAll",
  "Scale",
  "Scale3d",
  "Scaling",
  "Scan",
  "ScanBarcode",
  "ScanEye",
  "ScanFace",
  "ScanLine",
  "ScanSearch",
  "ScanText",
  "ScatterChart",
  "School",
  "School2",
  "Scissors",
  "ScissorsLineDashed",
  "ScissorsSquare",
  "ScissorsSquareDashedBottom",
  "ScreenShare",
  "ScreenShareOff",
  "Scroll",
  "ScrollText",
  "Search",
  "SearchCheck",
  "SearchCode",
  "SearchSlash",
  "SearchX",
  "Send",
  "SendHorizontal",
  "SendToBack",
  "SeparatorHorizontal",
  "SeparatorVertical",
  "Server",
  "ServerCog",
  "ServerCrash",
  "ServerOff",
  "Settings",
  "Settings2",
  "Shapes",
  "Share",
  "Share2",
  "Sheet",
  "Shell",
  "Shield",
  "ShieldAlert",
  "ShieldBan",
  "ShieldCheck",
  "ShieldEllipsis",
  "ShieldHalf",
  "ShieldMinus",
  "ShieldOff",
  "ShieldPlus",
  "ShieldQuestion",
  "ShieldX",
  "Ship",
  "ShipWheel",
  "Shirt",
  "ShoppingBag",
  "ShoppingBasket",
  "ShoppingCart",
  "Shovel",
  "ShowerHead",
  "Shrink",
  "Shrub",
  "Shuffle",
  "Sigma",
  "SigmaSquare",
  "Signal",
  "SignalHigh",
  "SignalLow",
  "SignalMedium",
  "SignalZero",
  "Signpost",
  "SignpostBig",
  "Siren",
  "SkipBack",
  "SkipForward",
  "Skull",
  "Slack",
  "Slash",
  "Slice",
  "Sliders",
  "SlidersHorizontal",
  "Smartphone",
  "SmartphoneCharging",
  "SmartphoneNfc",
  "Smile",
  "SmilePlus",
  "Snail",
  "Snowflake",
  "Sofa",
  "Soup",
  "Space",
  "Spade",
  "Sparkle",
  "Sparkles",
  "Speaker",
  "Speech",
  "SpellCheck",
  "SpellCheck2",
  "Spline",
  "Split",
  "SplitSquareHorizontal",
  "SplitSquareVertical",
  "SprayCan",
  "Sprout",
  "Square",
  "SquareAsterisk",
  "SquareCode",
  "SquareDashedBottom",
  "SquareDashedBottomCode",
  "SquareDot",
  "SquareEqual",
  "SquareSlash",
  "SquareStack",
  "SquareUser",
  "SquareUserRound",
  "Squircle",
  "Squirrel",
  "Stamp",
  "Star",
  "StarHalf",
  "StarOff",
  "StepBack",
  "StepForward",
  "Stethoscope",
  "Sticker",
  "StickyNote",
  "StopCircle",
  "Store",
  "StretchHorizontal",
  "StretchVertical",
  "Strikethrough",
  "Subscript",
  "Subtitles",
  "Sun",
  "SunDim",
  "SunMedium",
  "SunMoon",
  "SunSnow",
  "Sunrise",
  "Sunset",
  "Superscript",
  "SwissFranc",
  "SwitchCamera",
  "Sword",
  "Swords",
  "Syringe",
  "Table",
  "Table2",
  "TableProperties",
  "Tablet",
  "TabletSmartphone",
  "Tablets",
  "Tag",
  "Tags",
  "Tally1",
  "Tally2",
  "Tally3",
  "Tally4",
  "Tally5",
  "Tangent",
  "Target",
  "Tent",
  "TentTree",
  "Terminal",
  "TerminalSquare",
  "TestTube",
  "TestTube2",
  "TestTubes",
  "Text",
  "TextCursor",
  "TextCursorInput",
  "TextQuote",
  "TextSelect",
  "Theater",
  "Thermometer",
  "ThermometerSnowflake",
  "ThermometerSun",
  "ThumbsDown",
  "ThumbsUp",
  "Ticket",
  "Timer",
  "TimerOff",
  "TimerReset",
  "ToggleLeft",
  "ToggleRight",
  "Tornado",
  "Torus",
  "Touchpad",
  "TouchpadOff",
  "TowerControl",
  "ToyBrick",
  "Tractor",
  "TrafficCone",
  "TrainFront",
  "TrainFrontTunnel",
  "TrainTrack",
  "TramFront",
  "Trash",
  "Trash2",
  "TreeDeciduous",
  "TreePine",
  "Trees",
  "Trello",
  "TrendingDown",
  "TrendingUp",
  "Triangle",
  "TriangleRight",
  "Trophy",
  "Truck",
  "Turtle",
  "Tv",
  "Tv2",
  "Twitch",
  "Twitter",
  "Type",
  "Umbrella",
  "UmbrellaOff",
  "Underline",
  "Undo",
  "Undo2",
  "UndoDot",
  "UnfoldHorizontal",
  "UnfoldVertical",
  "Ungroup",
  "Unlink",
  "Unlink2",
  "Unlock",
  "UnlockKeyhole",
  "Unplug",
  "Upload",
  "UploadCloud",
  "Usb",
  "User",
  "UserCheck",
  "UserCog",
  "UserMinus",
  "UserPlus",
  "UserRound",
  "UserRoundCheck",
  "UserRoundCog",
  "UserRoundMinus",
  "UserRoundPlus",
  "UserRoundSearch",
  "UserRoundX",
  "UserSearch",
  "UserX",
  "Users",
  "UsersRound",
  "Utensils",
  "UtensilsCrossed",
  "UtilityPole",
  "Variable",
  "Vegan",
  "VenetianMask",
  "Vibrate",
  "VibrateOff",
  "Video",
  "VideoOff",
  "Videotape",
  "View",
  "Voicemail",
  "Volume",
  "Volume1",
  "Volume2",
  "VolumeX",
  "Vote",
  "Wallet",
  "Wallet2",
  "WalletCards",
  "Wallpaper",
  "Wand",
  "Wand2",
  "Warehouse",
  "Watch",
  "Waves",
  "Waypoints",
  "Webcam",
  "Webhook",
  "Weight",
  "Wheat",
  "WheatOff",
  "WholeWord",
  "Wifi",
  "WifiOff",
  "Wind",
  "Wine",
  "WineOff",
  "Workflow",
  "WrapText",
  "Wrench",
  "X",
  "XCircle",
  "XOctagon",
  "XSquare",
  "Youtube",
  "Zap",
  "ZapOff",
  "ZoomIn",
  "ZoomOut",
] as const;
