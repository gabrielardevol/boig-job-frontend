export interface Offer {
  id: string,
  text: string,
  company: string,
  role: string,
  experience: {
    minimum: number,
    maximum: number
  }
  skills: string[],
  salaryRange: {
    minimum: number,
    maximum: number
  }
  responses: Response[],
  appliedAt: Date,
  contractType:
    'permanent' | 'temporary' | 'part-time' | 'full-time' | 'internship' | 'freelance' | 'project-based' | 'consultant',
  recruiter: string,
  platform: string,
  location: string,
  typology: 'remote' | 'hybrid' | 'onsite',
  state?: 'inProcess' | 'rejected' | 'waitingForResponse' | undefined,
}

export interface OfferResponse {
  // confirmation means application has been received
  // when response is  received, a corresponding application instance is sugested;
  // meaning Response responds to that specific Application
  // however, Application is not a required field
  // due to the large amount of applications, it being required can affect user experience
  // if type = interview, an interview date can be submitted to mark the calendar;
  // if type = confirmation, ??????????
  // if type = rejection , ????????
  // if type = employmentOffer, ???????
  id: string;
  text: string;
  type: 'rejection' | 'confirmation' | 'interview' | 'employmentOffer';
  offer?: Offer | string | null;
  company?: string
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
