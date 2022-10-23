import { Activity } from "./activities";

export type Status = "online" | "idle" | "dnd" | "offline";

export interface IPresence {
  activities: Activity[];
  avatarHash: string;
  status: Status
  userId: string;
}
