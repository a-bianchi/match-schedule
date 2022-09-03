export interface MatchPublic {
  name: string;
  time: string;
  address: string;
  headlines: Headline[];
  note: string;
}

export interface Headline {
  name: string;
  phone: number;
  attend: boolean;
}

export interface MatchPublicResponse extends MatchPublic {
  _id: string;
  __v: number;
  Headline: HeadlineResponse[];
}

export interface HeadlineResponse extends Headline {
  _id: string;
}
