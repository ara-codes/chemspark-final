import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './utils/AppContext';
import Sidebar from './components/Sidebar';
import { NotificationStack, useNotification } from './components/Notification';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import WasteSelection from './pages/WasteSelection';
import AdsorptionExperiment from './pages/AdsorptionExperiment';
import AdsorptionAnalysis from './pages/AdsorptionAnalysis';
import IsothermModelling from './pages/IsothermModelling';
import AIOptimization from './pages/AIOptimization';
import Results from './pages/Results';
import Methodology from './pages/Methodology';

function PageRouter() {
  const { currentPage } = useApp();
  const { notifications, remove } = useNotification();
  const [renderedPage, setRenderedPage] = useState(currentPage);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (currentPage === renderedPage) return;
    setTransitioning(true);
    const t1 = setTimeout(() => {
      setRenderedPage(currentPage);
    }, 100);
    const t2 = setTimeout(() => {
      setTransitioning(false);
    }, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPage, renderedPage]);

  const pages = {
    landing: Landing,
    dashboard: Dashboard,
    'waste-selection': WasteSelection,
    experiment: AdsorptionExperiment,
    analysis: AdsorptionAnalysis,
    isotherm: IsothermModelling,
    optimization: AIOptimization,
    results: Results,
    methodology: Methodology,
  };

  const Page = pages[renderedPage] || Landing;
  const showSidebar = renderedPage !== 'landing';

  return (
    <div className="min-h-screen bg-beige">
      {showSidebar && <Sidebar />}
      <NotificationStack notifications={notifications} onRemove={remove} />
      <main className={`${showSidebar ? 'lg:ml-60' : ''} min-h-screen`}>
        <div
          className={`transition-all duration-150 ${
            transitioning ? 'opacity-0 translate-y-2 scale-[0.998]' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <Page />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PageRouter />
    </AppProvider>
  );
}