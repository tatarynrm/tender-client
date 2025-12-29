// // src/features/dashboard/settings/ui/SettingsTabs.tsx
// "use client"

// import { useEffect } from "react"
// import { useRouter, useSearchParams } from "next/navigation"

// import { ProfileTab } from "./ProfileTab"
// import { SecurityTab } from "./SecurityTab"
// import { NotificationsTab } from "./NotificationTab"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui"


// export function SettingsTabs() {
//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Отримуємо активний таб або дефолтний
//   const activeTab = searchParams.get("tab") || "profile"

//   // Якщо параметра tab немає — додаємо його в URL при завантаженні
//   useEffect(() => {
//     if (!searchParams.get("tab")) {
//       const params = new URLSearchParams(searchParams)
//       params.set("tab", "profile")
//       router.replace(`?${params.toString()}`, { scroll: false })
//     }
//   }, [searchParams, router])

//   const handleTabChange = (value: string) => {
//     const params = new URLSearchParams(searchParams)
//     params.set("tab", value)
//     router.replace(`?${params.toString()}`, { scroll: false })
//   }

//   return (
//     <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
//       <TabsList>
//         <TabsTrigger value="profile">Профіль</TabsTrigger>
//         <TabsTrigger value="security">Безпека</TabsTrigger>
//         <TabsTrigger value="notifications">Сповіщення</TabsTrigger>
//         <TabsTrigger value="telegram">Telegram</TabsTrigger>
//       </TabsList>

//       <TabsContent value="profile">
//         <ProfileTab />
//       </TabsContent>

//       <TabsContent value="security">
//         <SecurityTab />
//       </TabsContent>

//       <TabsContent value="notifications">
//         <NotificationsTab />
//       </TabsContent>

//       <TabsContent value="telegram">
//         <TelegramTab />
//       </TabsContent>
//     </Tabs>
//   )
// }
