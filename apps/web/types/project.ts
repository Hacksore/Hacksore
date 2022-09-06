export type ProjectStatus = "alive" | "dead" | "shambles";

export interface IProjectInfo {
  name: string;
  desc: string;
  repoUrl?: string;
  websiteUrl?: string;
  status: ProjectStatus
}
