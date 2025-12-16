"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const ProfileFormSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* 2FA Field */}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-60" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* Link */}
        <div className="flex justify-end">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileFormSkeleton;
