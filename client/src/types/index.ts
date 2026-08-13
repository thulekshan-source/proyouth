export interface LocalizedString {
  en: string;
  ta: string;
  si: string;
}

export interface Career {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  salaryRange: LocalizedString;
  qualifications: LocalizedString;
  institutes: LocalizedString;
  scholarships: LocalizedString;
  tags: string[];
  category: string;
}

export interface Mentor {
  id: string;
  name: string;
  profession: LocalizedString;
  bio: LocalizedString;
  imageUrl?: string;
}
