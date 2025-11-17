
import type { WeeklyReport } from './types';

export const EMPTY_REPORT: WeeklyReport = {
  id: '',
  date: '',
  financeIncome: {
    tithe: 0,
    thanksgiving: 0,
    mission: 0,
    relief: 0,
    special: 0,
  },
  financeExpense: {
    worshipAndEducation: 0,
    ministry: 0,
    personnel: 0,
    operations: 0,
    facilitiesAndEquipment: 0,
    cafeAndCommunity: 0,
    other: 0,
  },
  financeBalance: {
    previousWeekBalance: 0,
  },
  attendance: {
    sundayWorship: 0,
    weekdayWorship: 0,
    smallGroup: 0,
    newcomers: 0,
  },
  visitation: {
    homeVisits: '',
    hospitalVisits: '',
    counselingRequests: '',
    scheduledVisits: '',
  },
  events: {
    thisWeekSummary: '',
    nextWeekSchedule: '',
  },
  notes: {
    memberNews: '',
    adminAndFacilitiesIssues: '',
    requestsAndActions: '',
    other: '',
  },
};

export const DUMMY_REPORTS: WeeklyReport[] = [
    {
      id: "2024-07-21T00:00:00.000Z",
      date: "2024년 7월 21일",
      financeIncome: { tithe: 1200000, thanksgiving: 300000, mission: 150000, relief: 50000, special: 200000 },
      financeExpense: { worshipAndEducation: 250000, ministry: 180000, personnel: 800000, operations: 120000, facilitiesAndEquipment: 50000, cafeAndCommunity: 30000, other: 20000 },
      financeBalance: { previousWeekBalance: 5000000 },
      attendance: { sundayWorship: 150, weekdayWorship: 45, smallGroup: 80, newcomers: 3 },
      visitation: { homeVisits: "김 집사 가정 방문 (자녀 진학 문제)", hospitalVisits: "박 권사 병문안 (수술 후 회복 중)", counselingRequests: "청년 진로 상담 1건", scheduledVisits: "최 장로 가정" },
      events: { thisWeekSummary: "청년부 여름 수련회 준비 모임", nextWeekSchedule: "전교인 야외 예배 (장소: 희망 공원)" },
      notes: { memberNews: "이 성도 가정 득남", adminAndFacilitiesIssues: "본당 에어컨 필터 교체 필요", requestsAndActions: "주차 안내 봉사자 추가 요청", other: "" }
    },
    {
      id: "2024-07-14T00:00:00.000Z",
      date: "2024년 7월 14일",
      financeIncome: { tithe: 1150000, thanksgiving: 250000, mission: 180000, relief: 60000, special: 100000 },
      financeExpense: { worshipAndEducation: 220000, ministry: 200000, personnel: 800000, operations: 110000, facilitiesAndEquipment: 0, cafeAndCommunity: 25000, other: 15000 },
      financeBalance: { previousWeekBalance: 4600000 },
      attendance: { sundayWorship: 145, weekdayWorship: 40, smallGroup: 75, newcomers: 1 },
      visitation: { homeVisits: "새가족 이 성도 가정 심방", hospitalVisits: "", counselingRequests: "부부 관계 상담 1건", scheduledVisits: "김 집사 가정" },
      events: { thisWeekSummary: "제직회", nextWeekSchedule: "청년부 수련회 준비 모임" },
      notes: { memberNews: "최 권사 장남 결혼", adminAndFacilitiesIssues: "2층 교육관 형광등 교체", requestsAndActions: "강단 꽃꽂이 헌물 들어옴", other: "" }
    },
     {
      id: "2024-07-07T00:00:00.000Z",
      date: "2024년 7월 7일",
      financeIncome: { tithe: 1300000, thanksgiving: 350000, mission: 120000, relief: 40000, special: 50000 },
      financeExpense: { worshipAndEducation: 280000, ministry: 150000, personnel: 800000, operations: 130000, facilitiesAndEquipment: 300000, cafeAndCommunity: 35000, other: 10000 },
      financeBalance: { previousWeekBalance: 4100000 },
      attendance: { sundayWorship: 155, weekdayWorship: 50, smallGroup: 85, newcomers: 5 },
      visitation: { homeVisits: "오랜 결석자 정 성도 가정 심방", hospitalVisits: "윤 장로 병문안 (정기 검진)", counselingRequests: "", scheduledVisits: "새가족 이 성도 가정" },
      events: { thisWeekSummary: "맥추감사주일 특별 예배", nextWeekSchedule: "정기 제직회" },
      notes: { memberNews: "", adminAndFacilitiesIssues: "음향 장비 점검 완료", requestsAndActions: "", other: "감사 헌금 특별 기도 제목 다수" }
    }
];
