import {
  CodeBracketIcon,
  HomeIcon,
  ReceiptPercentIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline"

export const menus = [
  {
    id: 1,
    text: "خانه",
    icon: HomeIcon,
    url: "/",
  },
  {
    id: 2,
    text: "پروفایل",
    icon: UserCircleIcon,
    url: "/profile",
  },
  {
    id: 3,
    text: "تراکنش ها",
    icon: ReceiptPercentIcon,
    url: "/transactions",
  },
  {
    id: 4,
    text: "درباره من",
    icon: CodeBracketIcon,
    url: "/me",
  },
]
