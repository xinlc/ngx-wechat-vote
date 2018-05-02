
export interface Voter {
  id: string;
  openId: string;
  name: string;
  phone: string;
  ranking: string;
  numbers: string;
  isVoteValid: boolean;
  photos: Array<string>;
  hasPassEnroll: boolean;
}

export interface Activity {
  totalEnroll: string;
  totalVoteNumbers: string;
  beginTime: string;
  endTime: string;
  limitNumberPerDay: string;
}
