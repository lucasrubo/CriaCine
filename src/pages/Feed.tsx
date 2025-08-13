import FeedContainer from "@/components/feed/FeedContainer";
import AppLayout from "@/components/layout/AppLayout";
import { Home } from "lucide-react";

const Feed = () => {
  return (
    <AppLayout
      title="Feed"
      subtitle="Descubra e compartilhe criações cinematográficas"
      icon={<Home className="h-6 w-6 text-primary" />}
      showSearch={true}
      showSidebar={true}
    >
      <FeedContainer showWelcome={true} />
    </AppLayout>
  );
};

export default Feed;
