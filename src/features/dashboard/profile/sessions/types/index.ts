export type Browser = 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Opera' | 'Other';
export type OS = 'Windows' | 'macOS' | 'Linux' | 'iOS' | 'Android' | 'Other';
export type Device = 'Desktop' | 'Mobile' | 'Tablet' | 'Other';

export interface ISession {
  id: string;
  browser: Browser;
  os: OS;
  device: Device;
  userAgent: string;
  ip: string;            // IPv4/IPv6, напр. "::1"
  location?: string | null; // може бути "Unknown location", null або відсутнє
  createdAt: string;     // ISO-8601 рядок, напр. "2025-08-14T20:07:40.921Z"
}