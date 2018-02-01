export class ReviewMod {
  id: string;
  userName: string;
  userId: string;
  title: string;
  details: string;
  propertyInformationId: string;
  overallRating: number = 1;
  staffRating: number = 1;
  noiseRating: number = 1;
  maintenanceRating: number = 1;
  neighborRating: number = 1;
  safetyRating: number = 1;
  groundsRating: number = 1;
  helpful: number;
  unHelpful: number;
  addedDateUtc: Date;
  constructor() { }
}
