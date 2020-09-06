export interface AchievementSummary {
  categories?: Map<string, AchievementSummaryCategory>;
  possible: number;
  completed: number;
}

export interface AchievementSummaryCategory {
  name: string;
  subcats?: AchievementSummarySubCategory[];
}

export interface AchievementSummarySubCategory {
  name: string;
  achievements?: MyAchievement[];
}

export interface MyAchievement extends AchievementItemJson {
  completed?: number; // timestamp
  rel?: string;
}

export interface AchievementsJson {
  supercats: AchievementSupercatJson[];
}

export interface AchievementSupercatJson {
  id: string;
  name: string;
  cats: AchievementCatJson[];
}

export interface AchievementCatJson {
  id: string;
  name: string;
  subcats: AchievementSubcatJson[];
}

export interface AchievementSubcatJson {
  id: string;
  name: string;
  items: AchievementItemJson[];
}

export interface AchievementItemJson {
  id: string;
  icon: string;
  points: number;
  title?: string;
  side?: 'H' | 'A';
  criteria?: Map<string, string>; // blizzardCriteria: wowheadCriteria
  notObtainable?: boolean;
}

export interface ArmorystatsAchievementResponse {
  achievements: ArmorystatsAchievement[];
}

export interface ArmorystatsAchievement {
  id: number;
  completed_timestamp: number;
  criteria: ArmorystatsAchievementCriteria;
}

export interface ArmorystatsAchievementCriteria {
  id: number;
  is_completed: boolean;
  amount?: number;
  child_criteria: ArmorystatsAchievementChildCriteria[];
}

export interface ArmorystatsAchievementChildCriteria {
  id: number;
  is_completed: boolean;
  amount?: number;
}
