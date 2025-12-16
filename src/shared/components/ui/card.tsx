import * as React from "react"
import { cn } from "@/shared/utils/index"

// ✅ Базова Card
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-400/50 dark:border-gray-800 dark:bg-slate-800 dark:hover:border-teal-500/50",
        className
      )}
      {...props}
    />
  )
}

// ✅ Header
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 px-6 pt-6",
        className
      )}
      {...props}
    />
  )
}

// ✅ Title
function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-2xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-indigo-400",
        className
      )}
      {...props}
    />
  )
}

// ✅ Description
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-gray-600 dark:text-gray-400 leading-relaxed", className)}
      {...props}
    />
  )
}

// ✅ Action (праворуч у Header)
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto self-start", className)}
      {...props}
    />
  )
}

// ✅ Content (основний текст/контент)
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pb-4 text-gray-700 dark:text-gray-300", className)}
      {...props}
    />
  )
}

// ✅ Footer
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between border-t border-gray-100 dark:border-gray-800 px-6 py-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
