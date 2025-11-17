
import React, { useMemo } from 'react';
import type { WeeklyReport } from '../types';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';

interface DashboardProps {
  reports: WeeklyReport[];
}

const formatCurrency = (value: number) => {
    if (value === 0) return '₩0';
    return `₩${value.toLocaleString()}`;
};

const Card: React.FC<{ title: string; value: string | number; className?: string }> = ({ title, value, className }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-brand-blue-800">{value}</p>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
    const sortedReports = useMemo(() => [...reports].sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime()), [reports]);

    const chartData = useMemo(() => {
        return sortedReports.map(report => {
            const totalIncome = Object.values(report.financeIncome).reduce((sum, val) => sum + val, 0);
            const totalExpense = Object.values(report.financeExpense).reduce((sum, val) => sum + val, 0);
            return {
                date: new Date(report.id).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric'}),
                '총 수입': totalIncome,
                '총 지출': totalExpense,
                '주일예배 참석': report.attendance.sundayWorship,
                '새가족': report.attendance.newcomers,
            };
        });
    }, [sortedReports]);
    
    const latestReport = reports[0];

    if (!latestReport) {
        return <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">데이터가 없습니다.</h2>
            <p className="text-gray-500 mt-2">새로운 보고서를 작성하여 분석을 시작하세요.</p>
        </div>
    }

    const latestTotalIncome = Object.values(latestReport.financeIncome).reduce((a, b) => a + b, 0);
    const latestTotalExpense = Object.values(latestReport.financeExpense).reduce((a, b) => a + b, 0);
    const currentBalance = latestReport.financeBalance.previousWeekBalance + latestTotalIncome - latestTotalExpense;

    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">최신 보고서 요약 ({latestReport.date})</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card title="총 수입" value={formatCurrency(latestTotalIncome)} />
                    <Card title="총 지출" value={formatCurrency(latestTotalExpense)} />
                    <Card title="이번 주 잔액" value={formatCurrency(currentBalance)} />
                    <Card title="주일예배 참석" value={`${latestReport.attendance.sundayWorship}명`} />
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">재정 추이</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(val) => `₩${(val / 10000).toLocaleString()}만`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="총 수입" fill="#36a9f8" />
                        <Bar dataKey="총 지출" fill="#f87171" />
                    </BarChart>
                </ResponsiveContainer>
            </section>
            
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">출석 추이</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="주일예배 참석" stroke="#1789e9" strokeWidth={2} />
                        <Line type="monotone" dataKey="새가족" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">과거 보고서 목록</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {reports.map(report => (
                            <li key={report.id} className="p-4 hover:bg-gray-50">
                                <p className="font-semibold text-brand-blue-700">{report.date}</p>
                                <p className="text-sm text-gray-600 mt-1">주일예배: {report.attendance.sundayWorship}명 | 새가족: {report.attendance.newcomers}명</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};
