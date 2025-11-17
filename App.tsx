
import React, { useState, useCallback } from 'react';
import { ReportForm } from './components/ReportForm';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { WeeklyReport } from './types';
import { DUMMY_REPORTS, EMPTY_REPORT } from './constants';

type View = 'form' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [submittedReports, setSubmittedReports] = useLocalStorage<WeeklyReport[]>('submittedReports', DUMMY_REPORTS);
  const [draftReport, setDraftReport] = useLocalStorage<WeeklyReport>('draftReport', EMPTY_REPORT);

  const handleSaveDraft = useCallback((report: WeeklyReport) => {
    setDraftReport(report);
  }, [setDraftReport]);

  const handleSubmitReport = useCallback((report: WeeklyReport) => {
    const reportToSubmit = {
      ...report,
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setSubmittedReports(prevReports => [reportToSubmit, ...prevReports]);
    setDraftReport(EMPTY_REPORT);
    setView('dashboard');
  }, [setSubmittedReports, setDraftReport]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {view === 'form' && (
          <ReportForm
            draftReport={draftReport}
            onSaveDraft={handleSaveDraft}
            onSubmitReport={handleSubmitReport}
          />
        )}
        {view === 'dashboard' && <Dashboard reports={submittedReports} />}
      </main>
    </div>
  );
};

export default App;
