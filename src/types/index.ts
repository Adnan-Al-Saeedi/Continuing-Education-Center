export type ActivityType = 'course' | 'workshop';
export type ReminderType = 'first' | 'second' | 'manual';
export type SendStatus = 'sent' | 'failed' | 'pending';
export type AppliesTo = 'courses' | 'workshops' | 'both';
export type DocumentKind = 'file' | 'link';

export interface Settings {
  id?: string;
  university_name: string;
  college_name: string;
  center_name: string;
  logo_url?: string;
  sender_name: string;
  reply_to: string;
  days_before: number;
  second_reminder: boolean;
  second_reminder_days: number;
  admin_email?: string;
}

export interface Lecturer {
  id: string;
  full_name: string;
  normalized_name: string;
  title?: string;
  department: string;
  email: string;
  phone?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  department: string;
  lecturers_raw: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  location?: string;
  start_time?: string;
  duration?: string;
  target_audience?: string;
  notes?: string;
  date_fixed: boolean;
  parsed_lecturers?: string[];
}

export interface NameAlias {
  id?: string;
  raw_name: string;
  lecturer_id: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description?: string;
  kind: DocumentKind;
  url: string;
  storage_path?: string;
  file_size_bytes?: number;
  applies_to: AppliesTo;
}

export interface EmailTemplate {
  id?: string;
  subject: string;
  body_html: string;
}

export interface SendLog {
  id: string;
  activity_id: string;
  activity_title?: string;
  activity_type?: ActivityType;
  lecturer_id?: string;
  recipient_name: string;
  email: string;
  reminder_type: ReminderType;
  status: SendStatus;
  error?: string;
  attempts: number;
  sent_at: string;
}

export interface UnmatchedLecturer {
  raw_name: string;
  normalized_raw: string;
  activity_title: string;
  department: string;
  activity_id: string;
  suggestions: Array<{
    lecturer: Lecturer;
    similarity: number; // 0 to 100
  }>;
}

export interface DateConflictItem {
  activityId: string;
  title: string;
  type: ActivityType;
  department: string;
  originalStart: string;
  originalEnd: string;
  correctedStart: string;
  correctedEnd: string;
}

export interface DashboardStats {
  thisWeekCount: number;
  nextWeekCount: number;
  sentCount: number;
  failedCount: number;
  missingEmailCount: number;
  totalActivities: number;
  totalLecturers: number;
}
