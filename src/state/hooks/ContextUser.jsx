import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ActivityContext } from "../context/ActivityContext";
import { AttendanceContext } from "../context/AttendanceContext";
import { AuthContext } from "../context/AuthContext";
import { DivisionContext } from "../context/DivisionContext";
import { FeedbackContext } from "../context/FeedbackContext";
import { ScheduleContext } from "../context/ScheduleContext";

export const useActivity = () => useContext(ActivityContext);
export const useAttendance = () => useContext(AttendanceContext);
export const useAuth = () => useContext(AuthContext);
export const useDivision = () => useContext(DivisionContext);
export const useFeedback = () => useContext(FeedbackContext);
export const useSchedule = () => useContext(ScheduleContext);
export const useUser = () => useContext(UserContext);