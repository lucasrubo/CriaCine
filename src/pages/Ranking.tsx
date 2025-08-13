import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import TopRanking from '@/components/sidebar/TopRanking';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Top Ranking"
      subtitle="Os posts mais populares da comunidade"
      icon={<Trophy className="h-6 w-6 text-yellow-500" />}
      showSearch={true}
      showBackButton={true}
      backPath="/Roteirum/feed"
      sidebarContent={<Sidebar showTopRanking={false} />}
    >
      <TopRanking 
        showFullRanking={true} 
        limit={100}
        className="w-full"
      />
    </AppLayout>
  );
};

export default Ranking;