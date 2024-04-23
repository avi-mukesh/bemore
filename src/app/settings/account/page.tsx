import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarUpload from "@/components/ui/settings/avatar-upload";
import React from "react";

export default async function page() {
  const session = await auth();

  return (
    <ScrollArea>
      <div className="flex-1 space-y-4 p-4 md:py-8 md:px-0 pt-6">
        <div className="space-y-16 ">
          <div className="flex flex-col gap-4">
            {session?.user?.id && <AvatarUpload userId={session.user.id} />}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
