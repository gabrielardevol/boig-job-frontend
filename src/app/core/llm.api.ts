import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import {environment} from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class LlmApiService {
  private readonly API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly API_KEY = environment.groqApiKey;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${this.API_KEY}`,
    'Content-Type': 'application/json',
  });
  private readonly offerInterface = `
  Offer {
  company: string,
  role: string,
  experienceMinimum: number,
  experienceMaximum: number,
  salaryMinimum: number,
  salaryMaximum: number,
  skills: string[],
  contractType: 'permanent' | 'temporary' | 'part-time' | 'full-time' | 'internship' | 'freelance' | 'project-based' | 'consultant',,
  recruiter: string,
  location: string,
  platform: string,
  typology: 'remote' | 'hybrid' | 'onsite'
}`

  private readonly outputExample = `
  {
  "company": "BlinkLearning",
  "role": "Full stack developer",
 experienceMinimum: 1,
  experienceMaximum: 2,
  salaryMinimum: 24.000,
  salaryMaximum: 28.000,
  "skills": [
    "PHP",
    "JavaScript",
    "CSS",
    "MySQL",
    "AJAX",
    "jQuery",
    "HTML5",
    "Bootstrap",
    "GIT",
    "Linux",
    "AWS"
  ],
  "contractType": "temporary",
   "platform": Indeed,
  location: Reus, Spain,
  typology: 'remote'
}`

  constructor(private http: HttpClient) {}

  sendOffer(message: string): Observable<any> {
    if (message == "") {console.log("llmApi message == ''")}

    const headers = this.headers

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `The user will send you a text from a job offer announced at some work portal.
        I want you to analyze it and return an instance of the next javascript object.
        The answer has to be only the object, no additional info.
        PLatform refers to the job search portal, for exmaple LinkedIn.
        ${this.offerInterface}.
        I also want you to translate role, location and skills to english.
        If you have enough information, add country to the location.
        If the experience is in months, show it as years in decimals.
        If there is no experience max or min (range), use the value for mix and min (example: 3 years, experience.minimum = 3, experience.maximum = 3
        Recruiter must be a persons name.
        This is an example of a deisred output: ${this.outputExample}`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    return this.http.post<any>(this.API_URL, body, { headers }).pipe(
      map((res) => ({
        success: true,
        output: JSON.parse(res?.choices?.[0]?.message?.content?.trim() || ''),
      })),
      catchError((error) => {
          console.error(error);
          return of({
            success: false,
            error: error?.error?.error?.message || error.message || 'Unknown error',
          })
        }
      )
    );
  }

  sendReply(message: string): Observable<any> {
    const headers = this.headers
    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `
          the user has received an email from a company they have applied to. You will return a json object, with no annotation or comment aside. It has to be like:
          {
                type: 'rejection' | 'confirmation' | 'interview' | 'employmentOffer' | 'assignment';
                company: string;
                role: string;

          }`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };
    return this.http.post<any>(this.API_URL, body, { headers }).pipe(
      map((res) => ({
        success: true,
        output: JSON.parse(res?.choices?.[0]?.message?.content?.trim() || ''),
      })),
      catchError((error) =>
        of({
          success: false,
          error: error?.error?.error?.message || error.message || 'Unknown error',
        })
      ))
  }
}
