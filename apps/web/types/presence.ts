import { Activity } from "./activities";

export interface IPresence {
  activities: Activity[];
  avatarHash: string;
  status: "online" | "idle" | "dnd";
  userId: string;
}
