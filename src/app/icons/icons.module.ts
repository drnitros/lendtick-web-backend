import { NgModule } from '@angular/core';
import { 
	IconCamera, 
	IconHeart, 
	IconGithub,
	IconActivity,
	IconAirplay,
	IconAlertCircle,
	IconAlertOctagon,
	IconAlertTriangle,
	IconAlignCenter,
	IconAlignJustify,
	IconAlignLeft,
	IconAlignRight,
	IconAnchor,
	IconAperture,
	IconArrowDownCircle,
	IconArrowDownLeft,
	IconArrowDownRight,
	IconArrowDown,
	IconArrowLeftCircle,
	IconArrowLeft,
	IconArrowRightCircle,
	IconArrowRight,
	IconArrowUpCircle,
	IconArrowUpLeft,
	IconArrowUpRight,
	IconArrowUp,
	IconAtSign,
	IconAward,
	IconBarChart2,
	IconBarChart,
	IconBatteryCharging,
	IconBattery,
	IconBellOff,
	IconBell,
	IconBluetooth,
	IconBold,
	IconBookOpen,
	IconBook,
	IconBookmark,
	IconBox,
	IconBriefcase,
	IconCalendar,
	IconCameraOff, 
	IconCast,
	IconCheckCircle,
	IconCheckSquare,
	IconCheck,
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronUp,
	IconChevronsDown,
	IconChevronsLeft,
	IconChevronsRight,
	IconChevronsUp,
	IconChrome,
	IconCircle,
	IconClipboard,
	IconClock,
	IconCloudDrizzle,
	IconCloudLightning,
	IconCloudOff,
	IconCloudRain,
	IconCloudSnow,
	IconCloud,
	IconCode,
	IconCodepen,
	IconCommand,
	IconCompass,
	IconCopy,
	IconCornerDownLeft,
	IconCornerDownRight,
	IconCornerLeftDown,
	IconCornerLeftUp,
	IconCornerRightDown,
	IconCornerRightUp,
	IconCornerUpLeft,
	IconCornerUpRight,
	IconCpu,
	IconCreditCard,
	IconCrop,
	IconCrosshair,
	IconDatabase,
	IconDelete,
	IconDisc,
	IconDollarSign,
	IconDownloadCloud,
	IconDownload,
	IconDroplet,
	IconEdit2,
	IconEdit3,
	IconEdit,
	IconExternalLink,
	IconEyeOff,
	IconEye,
	IconFacebook,
	IconFastForward,
	IconFeather,
	IconFileMinus,
	IconFilePlus,
	IconFileText,
	IconFile,
	IconFilm,
	IconFilter,
	IconFlag,
	IconFolderMinus,
	IconFolderPlus,
	IconFolder,
	IconGitBranch,
	IconGitCommit,
	IconGitMerge,
	IconGitPullRequest,
	IconGitlab,
	IconGlobe,
	IconGrid,
	IconHardDrive,
	IconHash,
	IconHeadphones,
	IconHelpCircle,
	IconHome,
	IconImage,
	IconInbox,
	IconInfo,
	IconInstagram,
	IconItalic,
	IconLayers,
	IconLayout,
	IconLifeBuoy,
	IconLink2,
	IconLink,
	IconLinkedin,
	IconList,
	IconLoader,
	IconLock,
	IconLogIn,
	IconLogOut,
	IconMail,
	IconMapPin,
	IconMap,
	IconMaximize2,
	IconMaximize,
	IconMenu,
	IconMessageCircle,
	IconMessageSquare,
	IconMicOff,
	IconMic,
	IconMinimize2,
	IconMinimize,
	IconMinusCircle,
	IconMinusSquare,
	IconMinus,
	IconMonitor,
	IconMoon,
	IconMoreHorizontal,
	IconMoreVertical,
	IconMove,
	IconMusic,
	IconNavigation2,
	IconNavigation,
	IconOctagon,
	IconPackage,
	IconPaperclip,
	IconPauseCircle,
	IconPause,
	IconPercent,
	IconPhoneCall,
	IconPhoneForwarded,
	IconPhoneIncoming,
	IconPhoneMissed,
	IconPhoneOff,
	IconPhoneOutgoing,
	IconPhone,
	IconPieChart,
	IconTwitter,
	IconType,
	IconSidebar,
	IconSliders,
	IconSearch,
	IconUser,
	IconSettings,
	IconTruck,
	IconZoomOut,
	IconZoomIn,
	IconZap,
	IconZapOff,
	IconX,
	IconXSquare,
	IconXCircle,
	IconWind,
	IconWifi,
	IconWifiOff,
	IconWatch,
	IconVolume,
	IconVolumeX,
	IconVolume2,
	IconVolume1,
	IconVoicemail,
	IconVideo,
	IconVideoOff,
	IconUsers,
	IconUserX,
	IconUserPlus,
	IconUserMinus,
	IconUserCheck,
	IconUpload,
	IconUploadCloud,
	IconUnlock,
	IconUnderline,
	IconUmbrella,
	IconTv,
	IconTriangle,
	IconTrendingUp,
	IconTrendingDown,
	IconTrash,
	IconTrash2,
	IconToggleRight,
	IconToggleLeft,
	IconThumbsUp,
	IconThumbsDown,
	IconThermometer,
	IconTerminal,
	IconTarget,
	IconTag,
	IconTablet,
	IconSunset,
	IconSunrise,
	IconSun,
	IconStopCircle,
	IconStar,
	IconSquare,
	IconSpeaker,
	IconSmartphone,
	IconSlash,
	IconSlack,
	IconSkipForward,
	IconSkipBack,
	IconShuffle,
	IconShoppingCart,
	IconShoppingBag,
	IconShield,
	IconShieldOff,
	IconShare,
	IconShare2,
	IconServer,
	IconSend,
	IconScissors,
	IconSave,
	IconRss,
	IconRotateCw,
	IconRotateCcw,
	IconRewind,
	IconRepeat,
	IconRefreshCw,
	IconRefreshCcw,
	IconRadio,
	IconPrinter,
	IconPower,
	IconPocket,
	IconPlus,
	IconPlusSquare,
	IconPlusCircle,
	IconPlay,
	IconPlayCircle,
} from 'angular-feather';

const icons = [
	IconPlayCircle,
	IconPlay,
	IconPlusCircle,
	IconPlusSquare,
	IconPlus,
	IconPocket,
	IconPower,
	IconPrinter,
	IconRadio,
	IconRefreshCcw,
	IconRefreshCw,
	IconRepeat,
	IconRewind,
	IconRotateCcw,
	IconRotateCw,
	IconRss,
	IconSave,
	IconScissors,
	IconSend,
	IconServer,
	IconShare2,
	IconShare,
	IconShieldOff,
	IconShield,
	IconShoppingBag,
	IconShoppingCart,
	IconShuffle,
	IconSkipBack,
	IconSkipForward,
	IconSlack,
	IconSlash,
	IconSmartphone,
	IconSpeaker,
	IconSquare,
	IconStar,
	IconStopCircle,
	IconSun,
	IconSunrise,
	IconSunset,
	IconTablet,
	IconTag,
	IconTarget,
	IconTerminal,
	IconThermometer,
	IconThumbsDown,
	IconThumbsUp,
	IconToggleLeft,
	IconToggleRight,
	IconTrash2,
	IconTrash,
	IconTrendingDown,
	IconTrendingUp,
	IconTriangle,
	IconTv,
	IconUmbrella,
	IconUnderline,
	IconUnlock,
	IconUploadCloud,
	IconUpload,
	IconUserCheck,
	IconUserMinus,
	IconUserPlus,
	IconUserX,
	IconUsers,
	IconVideoOff,
	IconVideo,
	IconVoicemail,
	IconVolume1,
	IconVolume2,
	IconVolumeX,
	IconVolume,
	IconWatch,
	IconWifiOff,
	IconWifi,
	IconWind,
	IconXCircle,
	IconXSquare,
	IconX,
	IconZapOff,
	IconZap,
	IconZoomIn,
	IconZoomOut,
	IconTruck,
	IconSettings,
	IconUser,
	IconSearch,
	IconSliders,
	IconSidebar,
	IconType,
	IconTwitter,
	IconPieChart,
	IconPhone,
	IconPhoneOutgoing,
	IconPhoneOff,
	IconPhoneMissed,
	IconPhoneIncoming,
	IconPhoneForwarded,
	IconPhoneCall,
	IconPercent,
	IconPause,
	IconPauseCircle,
	IconPaperclip,
	IconPackage,
	IconOctagon,
	IconNavigation,
	IconNavigation2,
	IconMusic,
	IconMove,
	IconMoreVertical,
	IconMoreHorizontal,
	IconMoon,
	IconMonitor,
	IconMinus,
	IconMinusSquare,
	IconMinusCircle,
	IconMinimize,
	IconMinimize2,
	IconMic,
	IconMicOff,
	IconMessageSquare,
	IconMessageCircle,
	IconMenu,
	IconMaximize,
	IconMaximize2,
	IconMap,
	IconMapPin,
	IconMail,
	IconLogOut,
	IconLogIn,
	IconLock,
	IconLoader,
	IconList,
	IconLinkedin,
	IconLink,
	IconLink2,
	IconLifeBuoy,
	IconLayout,
	IconLayers,
	IconItalic,
	IconInstagram,
	IconInfo,
	IconInbox,
	IconImage,
	IconHome,
	IconHelpCircle,
	IconHeadphones,
	IconHash,
	IconHardDrive,
	IconGrid,
	IconGlobe,
	IconGitlab,
	IconGitPullRequest,
	IconGitMerge,
	IconGitCommit,
	IconGitBranch,
	IconFolder,
	IconFolderPlus,
	IconFolderMinus,
	IconFlag,
	IconFilter,
	IconFilm,
	IconFile,
	IconFileText,
	IconFilePlus,
	IconFileMinus,
	IconFeather,
	IconFastForward,
	IconFacebook,
	IconEye,
	IconEyeOff,
	IconExternalLink,
	IconEdit,
	IconEdit3,
	IconEdit2,
	IconDroplet,
	IconDownload,
	IconDownloadCloud,
	IconDollarSign,
	IconDisc,
	IconDelete,
	IconDatabase,
	IconCrosshair,
	IconCrop,
	IconCreditCard,
	IconCpu,
	IconCornerUpRight,
	IconCornerUpLeft,
	IconCornerRightUp,
	IconCornerRightDown,
	IconCornerLeftUp,
	IconCornerLeftDown,
	IconCornerDownRight,
	IconCornerDownLeft,
	IconCopy,
	IconCompass,
	IconCommand,
	IconCodepen,
	IconCode,
	IconCloud,
	IconCloudSnow,
	IconCloudRain,
	IconCloudOff,
	IconCloudLightning,
	IconCloudDrizzle,
	IconClock,
	IconClipboard,
	IconCircle,
	IconChrome,
	IconChevronsUp,
	IconChevronsRight,
	IconChevronsLeft,
	IconChevronsDown,
	IconChevronUp,
	IconChevronRight,
	IconChevronLeft,
	IconChevronDown,
	IconCheck,
	IconCheckSquare,
	IconCheckCircle,
	IconCast,
	IconCameraOff,
	IconCalendar,
	IconBriefcase,
	IconBox,
	IconBookmark,
	IconBook,
	IconBookOpen,
	IconBold,
	IconBluetooth,
	IconBell,
	IconBellOff,
	IconBattery,
	IconBatteryCharging,
	IconBarChart,
	IconBarChart2,
	IconAward,
	IconAtSign,
	IconArrowUp,
	IconArrowUpRight,
	IconArrowUpLeft,
	IconArrowUpCircle,
	IconArrowRight,
	IconArrowRightCircle,
	IconArrowLeft,
	IconArrowLeftCircle,
	IconCamera,
	IconHeart,
	IconGithub,
	IconActivity,
	IconAirplay,
	IconAlertCircle,
	IconAlertOctagon,
	IconAlertTriangle,
	IconAlignCenter,
	IconAlignJustify,
	IconAlignLeft,
	IconAlignRight,
	IconAnchor,
	IconAperture,
	IconArrowDownCircle,
	IconArrowDownLeft,
	IconArrowDownRight,
	IconArrowDown
];

@NgModule({
  exports: icons
})
export class IconsModule { }
