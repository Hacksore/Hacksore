export type PresenceStatus = "online" | "idle" | "dnd" | "offline" | "invisible";

export enum ActivityType {
  /**
   * Playing {game}
   */
  Playing = 0,
  /**
   * Streaming {details}
   */
  Streaming = 1,
  /**
   * Listening to {name}
   */
  Listening = 2,
  /**
   * Watching {details}
   */
  Watching = 3,
  /**
   * {emoji} {details}
   */
  Custom = 4,
  /**
   * Competing in {name}
   */
  Competing = 5,
}

export interface Activity {
  type: ActivityType;
  name: string;
  state: string;
  details: string;
}

export interface IPresence {
  activities: Activity[];
  avatarHash: string;
  status: PresenceStatus;
  userId: string;
}

export interface Profile {
  status: PresenceStatus;
  avatarHash: string;
  userId: string;
  activities: Activity[];
  streaming: boolean;
}
