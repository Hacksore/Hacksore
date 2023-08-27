"use client";
import { Box, lighten, styled, Tooltip, Typography } from "@mui/material";
import IconGaming from "@mui/icons-material/VideogameAsset";
import IconMusic from "@mui/icons-material/Headphones";
import IconTwitter from "@mui/icons-material/Twitter";
import React from "react";
import { Activity, ActivityType, PresenceStatus } from "@boult/types";
import { SiNeovim } from "react-icons/si";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .activity": {
    padding: 4,
  },
  "& .tooltip": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 250,
    padding: 4,
  },
  display: "flex",
  justifyContent: "flex-end",
  textAlign: "left",
  "& .header": {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },
  "& .icon": {
    display: "flex",
    alignItems: "center",
    paddingRight: 6,
  },
  "& .name": {
    fontSize: 20,
    fontWeight: "bold",
  },
  "& .body": {
    fontSize: 18,
  },
  "& .divider": {
    backgroundColor: lighten(theme.palette.background.default, 0.2),
    border: "none",
    height: 1,
  },
  "& .ping": {
    textDecoration: "none",
    color: lighten(theme.palette.primary.main, 0.3),
    marginLeft: 4,
    marginRight: 4,
    display: "flex",
  },
}));

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
      <Typography>{state}</Typography>
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
        <Typography className="name">{name}</Typography>
      </div>
      <Typography className="body">{state}</Typography>
      <Typography className="body">{details}</Typography>
    </div>
  );
};

const ListeningActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <div className="header">
        <div className="icon">
          <IconMusic fontSize="large" />
        </div>
        <Typography className="name">{name}</Typography>
      </div>
      <Typography className="body">{details}</Typography>
      <Typography className="body">{state}</Typography>
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

  return (
    <StyledBox id="discord-avatar">
      <Tooltip
        disableHoverListener={disable}
        disableInteractive={disable}
        disableFocusListener
        arrow
        placement="bottom"
        PopperProps={{
          disablePortal: true,
        }}
        title={<PresenceTooltip activities={activities} />}
      >
        {children}
      </Tooltip>
    </StyledBox>
  );
};
