export type jobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  date: string;
  relevanceScore: number;
};

export type jobItemExtended = jobItem & {
  duration: string;
  salary: string;
  location: string;
  description: string;
  qualifications: string[];
  reviews: string[];
};

export type SortBy = "relevant" | "recent";

export type PageDirection = "previous" | "next";
