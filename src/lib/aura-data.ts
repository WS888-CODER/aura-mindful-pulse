export type Episode = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  startingHeartRate: number;
  averageHeartRate: number;
  peakHeartRate: number;
  heartRateSeries: number[];
  device: string;
  status: "recorded";
};

export const initialEpisodes: Episode[] = [
  {
    id: "001",
    date: "2026-09-23",
    startTime: "10:18",
    endTime: "10:20",
    duration: 120,
    startingHeartRate: 78,
    averageHeartRate: 91,
    peakHeartRate: 112,
    heartRateSeries: [78, 82, 87, 91, 98, 106, 112, 107, 101, 96, 91, 86],
    device: "AURA",
    status: "recorded",
  },
  {
    id: "002",
    date: "2026-09-22",
    startTime: "20:42",
    endTime: "20:44",
    duration: 120,
    startingHeartRate: 80,
    averageHeartRate: 94,
    peakHeartRate: 105,
    heartRateSeries: [80, 84, 89, 93, 97, 101, 105, 103, 99, 95, 91, 88],
    device: "AURA",
    status: "recorded",
  },
  {
    id: "003",
    date: "2026-09-21",
    startTime: "18:12",
    endTime: "18:14",
    duration: 120,
    startingHeartRate: 76,
    averageHeartRate: 89,
    peakHeartRate: 101,
    heartRateSeries: [76, 79, 84, 88, 93, 98, 101, 99, 95, 91, 87, 84],
    device: "AURA",
    status: "recorded",
  },
  {
    id: "004",
    date: "2026-09-18",
    startTime: "15:08",
    endTime: "15:10",
    duration: 120,
    startingHeartRate: 81,
    averageHeartRate: 95,
    peakHeartRate: 118,
    heartRateSeries: [81, 86, 91, 97, 104, 112, 118, 110, 103, 98, 93, 89],
    device: "AURA",
    status: "recorded",
  },
];

export const dailyHeartRate = [72, 74, 73, 77, 81, 78, 76, 79, 83, 80, 78, 76, 78];
export const activeHeartRate = [82, 89, 94, 101, 104, 108, 106, 102, 98, 94, 90];