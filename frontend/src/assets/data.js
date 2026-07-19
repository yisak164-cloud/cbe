import { MessageCircleMore, MessageSquare, Split, Check, ClipboardClock, RefreshCcw, Receipt, ReceiptText, WalletMinimal,Phone } from "lucide-react";

export const recentState = {
    states: [
        {
            "title": "Feedback",
            icon: MessageCircleMore,
            path: "/feed"
        },
        {
            "title": "Bill Share",
            icon: Split,
            path: "/bill"
        },
        {
            "title": "Schedule",
            icon: ClipboardClock,
            path: "/shedule"
        },
        {
            "title": "Recent",
            icon: Check,
            path: "/recent"
        }
    ]
}

export const MenuState={
    states:[
        {"title":"Telecom Service",
        icon:Phone,
        path:"/telecom"},
        {
            "title":"Other transfer",
            icon:RefreshCcw,
            path:"/other"



        },

        {
            "title":"CBEBirr",
            icon:WalletMinimal, 
            path:"/cbebirr"
        },

        {
            "title":"bill&utilities",
            icon: ReceiptText,
            path:"/bill"
        },
          {
            "title":"bill&utilities",
            icon: ReceiptText,
            path:"/bill"
        },
          {
            "title":"bill&utilities",
            icon: ReceiptText,
            path:"/bill"
        },
          {
            "title":"bill&utilities",
            icon: ReceiptText,
            path:"/bill"
        }



    ]
}