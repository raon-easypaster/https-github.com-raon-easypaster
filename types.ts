
export interface FinanceIncome {
  tithe: number;
  thanksgiving: number;
  mission: number;
  relief: number;
  special: number;
}

export interface FinanceExpense {
  worshipAndEducation: number;
  ministry: number;
  personnel: number;
  operations: number;
  facilitiesAndEquipment: number;
  cafeAndCommunity: number;
  other: number;
}

export interface FinanceBalance {
  previousWeekBalance: number;
}

export interface AttendanceReport {
  sundayWorship: number;
  weekdayWorship: number;
  smallGroup: number;
  newcomers: number;
}

export interface VisitationReport {
  homeVisits: string;
  hospitalVisits: string;
  counselingRequests: string;
  scheduledVisits: string;
}

export interface EventReport {
  thisWeekSummary: string;
  nextWeekSchedule: string;
}

export interface NotesReport {
  memberNews: string;
  adminAndFacilitiesIssues: string;
  requestsAndActions: string;
  other: string;
}

export interface WeeklyReport {
  id: string;
  date: string;
  financeIncome: FinanceIncome;
  financeExpense: FinanceExpense;
  financeBalance: FinanceBalance;
  attendance: AttendanceReport;
  visitation: VisitationReport;
  events: EventReport;
  notes: NotesReport;
}
