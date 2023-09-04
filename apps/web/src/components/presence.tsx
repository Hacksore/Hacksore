"use client";
import React from "react";
import { Activity, ActivityType, PresenceStatus } from "@boult/types";
import { SiNeovim } from "react-icons/si";

const PingLink = () => {
  return (
    <a className="ping" href="https://twitter.com/hacksore" target="_blank" rel="noreferrer">
      @Hacksore
    </a>
  );
};

const CurrentStatus = ({ state, activityLength }: { state: string; activityLength: number }) => {
  return (
    <div>
      <p>{state}</p>
      {activityLength > 1 && <hr className="divider" />}
    </div>
  );
};

const PlayingActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <div className="header">
        <div className="icon">
          {name === "Neovim" ? <SiNeovim fontSize="large" /> : <IconGaming fontSize="large" />}
        </div>
        <p className="name">{name}</p>
      </div>
      <p className="body">{state}</p>
      <p className="body">{details}</p>
    </div>
  );
};

const ListeningActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <div className="header">
        <div className="icon">mucis icons</div>
        <p className="name">{name}</p>
      </div>
      <p className="body">{details}</p>
      <p className="body">{state}</p>
    </div>
  );
};

const ACTIVITY_ORDER = [ActivityType.Custom, ActivityType.Playing, ActivityType.Listening];

const PresenceTooltip: React.FC<{ activities: Activity[] }> = ({ activities = [] }) => {
  const statusElements: React.JSX.Element[] = [];

  // sort based on order in ACTIVITY_ORDER
  activities.sort((a, b) => ACTIVITY_ORDER.indexOf(a.type) - ACTIVITY_ORDER.indexOf(b.type));

  activities.forEach((item: Activity) => {
    const { type } = item;

    if (type === ActivityType.Custom) {
      statusElements.push(<CurrentStatus activityLength={activities.length} {...item} />);
    }

    if (type === ActivityType.Playing) {
      statusElements.push(<PlayingActivity {...item} />);
    }

    if (type === ActivityType.Listening) {
      statusElements.push(<ListeningActivity {...item} />);
    }
  });

  return (
    <div className="tooltip">
      {statusElements.length === 0 ? (
        <Typography sx={{ fontWeight: "bold", pt: 1, pb: 1, justifyContent: "center", display: "flex" }}>
          Ping me <PingLink />
        </Typography>
      ) : (
        statusElements.map((component: React.JSX.Element, idx) => {
          return (
            <div className="activity" key={`activity-${idx}`}>
              {component}
            </div>
          );
        })
      )}
    </div>
  );
};

interface PresenceProps {
  activities: Activity[];
  children: any;
  status: PresenceStatus;
}

export const Presence: React.FC<PresenceProps> = ({ activities, children, status }) => {
  // don't show on DND
  const disable = status === "dnd";

  return <div>{children}</div>;
};
