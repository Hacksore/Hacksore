import { ActivityType } from "./presence";

export interface Activity {
  type: ActivityType;
  name: string;
  state: string;
  details: string;
}