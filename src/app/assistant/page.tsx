import { auth } from "@/auth";
import Chat from "@/components/ui/assistant/chat";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-2 h-full">
      <Chat username={session?.user?.username} />
    </div>
  );
}
