export interface Offer {
  id: string,
  text: string,
  company: string,
  role: string,
  skills: string[],
  experienceMinimum: number,
  experienceMaximum: number,
  salaryMinimum: number,
  salaryMaximum: number,
  responses: Response[],
  appliedAt: Date,
  contractType:
    'permanent' | 'temporary' | 'part-time' | 'full-time' | 'internship' | 'freelance' | 'project-based' | 'consultant',
  recruiter: string,
  platform: string,
  location: string,
  typology: 'remote' | 'hybrid' | 'onsite',
  state: number,
  comments?: AppComment[]
}

export interface OfferResponse {
  id: string;
  text: string;
  type: 'rejection' | 'confirmation' | 'interview' | 'employmentOffer' | 'assignment';
  offer?: Offer | string | null;
  company?: string;
  originalContent?: string;
}

export interface Dashboard {
  applications: {
    id: string,
    date: Date,
    role: string,
    salaryRange: {
      minimum: number,
      maximum: number
    }
  }[];
  applicationCount?: number;
  interviews: {
    first: number;
    second: number
  };
  rejections: number;
}

// export interface CalendarEvent {
//   id: string,
//   type: any,
//   title: string,
//   description: string,
//   date: Date,
// }
export interface Interview {
  id?: string,
  offer: string,
  title: string,
  description: string,
  date: Date,
  comments?: AppComment[]

}

export interface Assignment {
  id: string | number,
  offer: string,
  name: string,
  date: Date,
  message: string,
  comments?: AppComment[]

}

export interface AppComment {
  offer?: string,
  interview?: string,
  assignment?: string,
  id?: string,
  content: string,
  createdAt?: string | Date,
}
