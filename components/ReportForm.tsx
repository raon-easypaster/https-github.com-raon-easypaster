import React, { useState, useMemo, useCallback } from 'react';
import type { WeeklyReport } from '../types';

interface ReportFormProps {
  draftReport: WeeklyReport;
  onSaveDraft: (report: WeeklyReport) => void;
  onSubmitReport: (report: WeeklyReport) => void;
}

const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                type="button"
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <svg
                    className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && <div className="p-4 bg-white">{children}</div>}
        </div>
    );
};

const NumberInput: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string; }> = ({ label, value, onChange, name }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₩</span>
            </div>
            <input
                type="number"
                name={name}
                id={name}
                className="focus:ring-brand-blue-500 focus:border-brand-blue-500 block w-full pl-7 pr-2 sm:text-sm border-gray-300 rounded-md"
                value={value}
                onChange={onChange}
                placeholder="0"
            />
        </div>
    </div>
);

const TextInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void; name: string; rows?: number; }> = ({ label, value, onChange, name, rows }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
           {rows ? (
                <textarea
                    rows={rows}
                    name={name}
                    id={name}
                    className="shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={value}
                    onChange={onChange}
                />
           ) : (
                <input
                    type="text"
                    name={name}
                    id={name}
                    className="shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={value}
                    onChange={onChange}
                />
           )}
        </div>
    </div>
);


export const ReportForm: React.FC<ReportFormProps> = ({ draftReport, onSaveDraft, onSubmitReport }) => {
  const [report, setReport] = useState(draftReport);

  // FIX: Constrained the generic type `T` to only include keys of `WeeklyReport` that map to object values.
  // This prevents a type error when trying to spread a non-object value (like a string for `id` or `date`).
  const handleNumericChange = <T extends Exclude<keyof WeeklyReport, 'id' | 'date'>>(section: T, field: keyof WeeklyReport[T]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setReport(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };
  
  // FIX: Constrained the generic type `T` to only include keys of `WeeklyReport` that map to object values.
  // This prevents a type error when trying to spread a non-object value (like a string for `id` or `date`).
  const handleTextChange = <T extends Exclude<keyof WeeklyReport, 'id' | 'date'>>(section: T, field: keyof WeeklyReport[T]) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReport(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const totalIncome = useMemo(() => Object.values(report.financeIncome).reduce((sum, val) => sum + val, 0), [report.financeIncome]);
  const totalExpense = useMemo(() => Object.values(report.financeExpense).reduce((sum, val) => sum + val, 0), [report.financeExpense]);
  const currentBalance = useMemo(() => report.financeBalance.previousWeekBalance + totalIncome - totalExpense, [report.financeBalance.previousWeekBalance, totalIncome, totalExpense]);

  const handleSave = () => {
    onSaveDraft(report);
    alert('초안이 저장되었습니다.');
  };
  
  const handleSubmit = () => {
    if (window.confirm('보고서를 제출하시겠습니까? 제출 후에는 대시보드로 이동합니다.')) {
        onSubmitReport(report);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">주간 행정보고서 작성</h2>
        <p className="text-gray-500 mt-1">각 항목을 기입하고 저장 또는 제출해주세요.</p>
      </div>

      <form className="space-y-4">
        <Accordion title="1. 재정 보고" defaultOpen>
            <div className="space-y-6">
                 <div>
                    <h4 className="font-semibold text-gray-600 border-b pb-2 mb-3">1) 주간 수입 요약</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <NumberInput label="십일조" name="tithe" value={report.financeIncome.tithe} onChange={handleNumericChange('financeIncome', 'tithe')} />
                        <NumberInput label="감사" name="thanksgiving" value={report.financeIncome.thanksgiving} onChange={handleNumericChange('financeIncome', 'thanksgiving')} />
                        <NumberInput label="선교" name="mission" value={report.financeIncome.mission} onChange={handleNumericChange('financeIncome', 'mission')} />
                        <NumberInput label="구제" name="relief" value={report.financeIncome.relief} onChange={handleNumericChange('financeIncome', 'relief')} />
                        <NumberInput label="특별/기타" name="special" value={report.financeIncome.special} onChange={handleNumericChange('financeIncome', 'special')} />
                        <div className="p-4 bg-blue-50 rounded-md text-right">
                            <p className="text-sm font-medium text-blue-800">총 수입</p>
                            <p className="text-xl font-bold text-blue-800">{totalIncome.toLocaleString()} 원</p>
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-600 border-b pb-2 mb-3">2) 주간 지출 요약</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <NumberInput label="예배·교육비" name="worshipAndEducation" value={report.financeExpense.worshipAndEducation} onChange={handleNumericChange('financeExpense', 'worshipAndEducation')} />
                        <NumberInput label="사역비" name="ministry" value={report.financeExpense.ministry} onChange={handleNumericChange('financeExpense', 'ministry')} />
                        <NumberInput label="인건비" name="personnel" value={report.financeExpense.personnel} onChange={handleNumericChange('financeExpense', 'personnel')} />
                        <NumberInput label="운영비" name="operations" value={report.financeExpense.operations} onChange={handleNumericChange('financeExpense', 'operations')} />
                        <NumberInput label="시설·비품" name="facilitiesAndEquipment" value={report.financeExpense.facilitiesAndEquipment} onChange={handleNumericChange('financeExpense', 'facilitiesAndEquipment')} />
                        <NumberInput label="카페·공동체" name="cafeAndCommunity" value={report.financeExpense.cafeAndCommunity} onChange={handleNumericChange('financeExpense', 'cafeAndCommunity')} />
                        <NumberInput label="기타" name="other" value={report.financeExpense.other} onChange={handleNumericChange('financeExpense', 'other')} />
                        <div className="p-4 bg-red-50 rounded-md text-right">
                            <p className="text-sm font-medium text-red-800">총 지출</p>
                            <p className="text-xl font-bold text-red-800">{totalExpense.toLocaleString()} 원</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-600 border-b pb-2 mb-3">3) 주간 잔액</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <NumberInput label="전주 이월" name="previousWeekBalance" value={report.financeBalance.previousWeekBalance} onChange={handleNumericChange('financeBalance', 'previousWeekBalance')} />
                        <div className="p-4 bg-green-50 rounded-md text-right col-span-1 md:col-span-2">
                            <p className="text-sm font-medium text-green-800">이번 주 잔액</p>
                            <p className="text-xl font-bold text-green-800">{currentBalance.toLocaleString()} 원</p>
                        </div>
                    </div>
                </div>
            </div>
        </Accordion>
        
        <Accordion title="2. 출결 보고">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="주일예배 참석 (명)" name="sundayWorship" value={String(report.attendance.sundayWorship)} onChange={handleNumericChange('attendance', 'sundayWorship')} />
                <TextInput label="주중예배 참석 (명)" name="weekdayWorship" value={String(report.attendance.weekdayWorship)} onChange={handleNumericChange('attendance', 'weekdayWorship')} />
                <TextInput label="소그룹/셀 모임 참석 (명)" name="smallGroup" value={String(report.attendance.smallGroup)} onChange={handleNumericChange('attendance', 'smallGroup')} />
                <TextInput label="새가족·방문자 (명)" name="newcomers" value={String(report.attendance.newcomers)} onChange={handleNumericChange('attendance', 'newcomers')} />
            </div>
        </Accordion>
        
        <Accordion title="3. 심방 보고">
            <div className="space-y-4">
                <TextInput label="가정 심방" name="homeVisits" value={report.visitation.homeVisits} onChange={handleTextChange('visitation', 'homeVisits')} rows={2}/>
                <TextInput label="병원 심방" name="hospitalVisits" value={report.visitation.hospitalVisits} onChange={handleTextChange('visitation', 'hospitalVisits')} rows={2}/>
                <TextInput label="상담·기도 요청" name="counselingRequests" value={report.visitation.counselingRequests} onChange={handleTextChange('visitation', 'counselingRequests')} rows={2}/>
                <TextInput label="예정된 심방" name="scheduledVisits" value={report.visitation.scheduledVisits} onChange={handleTextChange('visitation', 'scheduledVisits')} rows={2}/>
            </div>
        </Accordion>
        
        <Accordion title="4. 행사 및 일정">
             <div className="space-y-4">
                <TextInput label="금주 진행 행사 요약" name="thisWeekSummary" value={report.events.thisWeekSummary} onChange={handleTextChange('events', 'thisWeekSummary')} rows={3}/>
                <TextInput label="다음 주 주요 일정" name="nextWeekSchedule" value={report.events.nextWeekSchedule} onChange={handleTextChange('events', 'nextWeekSchedule')} rows={3}/>
            </div>
        </Accordion>
        
        <Accordion title="5. 특이사항 및 비고">
            <div className="space-y-4">
                <TextInput label="성도 동정 (입원/회복/이사 등)" name="memberNews" value={report.notes.memberNews} onChange={handleTextChange('notes', 'memberNews')} rows={3}/>
                <TextInput label="행정·시설 이슈" name="adminAndFacilitiesIssues" value={report.notes.adminAndFacilitiesIssues} onChange={handleTextChange('notes', 'adminAndFacilitiesIssues')} rows={3}/>
                <TextInput label="요청/조치 사항" name="requestsAndActions" value={report.notes.requestsAndActions} onChange={handleTextChange('notes', 'requestsAndActions')} rows={3}/>
                <TextInput label="기타 기록" name="other" value={report.notes.other} onChange={handleTextChange('notes', 'other')} rows={3}/>
            </div>
        </Accordion>
      </form>
      
      <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-gray-50 py-4">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
        >
          초안 저장
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
        >
          보고서 제출
        </button>
      </div>
    </div>
  );
};
