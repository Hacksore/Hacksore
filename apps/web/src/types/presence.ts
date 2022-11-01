/* eslint-disable no-unused-vars */
import { Activity } from "./activities";

export enum ActivityType {
  Game,
  Streaming,
  Listening,
  Watching,
  Custom,
  Competing,
}

export type Status = "online" | "idle" | "dnd" | "offline";

export interface IPresence {
  activities: Activity[];
  avatarHash: string;
  status: Status;
  userId: string;
}
