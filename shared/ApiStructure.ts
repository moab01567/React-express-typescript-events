export enum EventCategory {
  Food = 0,
  Sports,
  Conference,
  Expo,
  Concert,
  Political,
  Religion,
  Protest,
}
export interface ApiMassageResponse {
  ok: boolean;
  status: number;
  massage: string;
  data?: any;
}
// use this interface when creating an event.
//used in backend
export interface ApiCreateUser {
  name: string;
  mailId: string;
  admin: boolean;
  picture: string | ApiMassageResponse;
  loginType: string;
}

//use this when receiving a user from backend,
//It's used in frontend
export interface ApiUser {
  _id?: string;
  name?: string;
  mailId?: string;
  admin?: boolean;
  picture?: string | ApiMassageResponse;
  loginType?: string;
}

///api/create/event
// use this interface when creating an event.
export interface ApiCreateEvent {
  title: string;
  organizer: ApiUser;
  category: EventCategory;
  dateTime: string;
  location: string;
  description: string;
  attendance: ApiUser[];
}

export interface ApiGetAnonymousEvents {
  _id: string;
  title: string;
}

//when getting any type of event from the endpoints
export interface ApiEvents {
  _id: string;
  title: string;
  organizer: ApiUser;
  category: EventCategory;
  dateTime: string;
  location: string;
  description: string;
  attendance: ApiUser[];
}

export interface ApiAttendingUpdate {
  id: string;
  attending: ApiUser;
}
