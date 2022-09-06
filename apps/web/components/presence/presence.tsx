import { Box, lighten, styled, Tooltip, Typography } from "@mui/material";
import IconGaming from "@mui/icons-material/VideogameAsset";
import IconMusic from "@mui/icons-material/Headphones";
import IconTerminal from "@mui/icons-material/Terminal";
import IconTwitter from "@mui/icons-material/Twitter";
import React from "react";
import { Activity } from "../../types/activities";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .activity": {
    padding: 4,
  },
  "& .tooltip": {
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
  "& .body": {
    fontSize: 18,
  },
  "& .divider": {
    backgroundColor: lighten(theme.palette.primary.main, 0.2),
    border: "none",
    height: 1,
  },
}));

const CurrentStatus = ({ state }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <Typography sx={{ fontWeight: "bold" }} variant="h6">{state}</Typography>
      <hr className="divider" />
    </div>
  );
};

const PlayingActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <div className="header">
        <div className="icon">
          {name === "Visual Studio Code" ? <IconTerminal fontSize="large" /> : <IconGaming fontSize="large" />}
        </div>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">{name}</Typography>
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
        <Typography sx={{ fontWeight: "bold" }} variant="h6">{name}</Typography>
      </div>
      <Typography className="body">{state}</Typography>
      <Typography className="body">{details}</Typography>
    </div>
  );
};

const ACTIVITY_ORDER = [
  "CUSTOM",
  "PLAYING",
  "LISTENING"
]

const PresenceTooltip: React.FC<{ activities: Activity[] }> = ({ activities = [] }) => {
  const statusElements: Function[] = [];

  // sort based on order in const
  activities.sort((a, b) => ACTIVITY_ORDER.indexOf(a.type) - ACTIVITY_ORDER.indexOf(b.type));

  activities.forEach((item: Activity) => {
    const { type } = item;
    if (type === "CUSTOM") {
      statusElements.push(() => <CurrentStatus {...item} />);
    }

    if (type === "PLAYING") {
      statusElements.push(() => <PlayingActivity {...item} />);
    }

    if (type === "LISTENING") {
      statusElements.push(() => <ListeningActivity {...item} />);
    }
  });

  return (
    <div className="tooltip">
      {statusElements.length === 0 ? (
        <Typography sx={{ fontWeight: "bold", display: "flex" }}>Ping me @Hacksore on <IconTwitter sx={{ ml: 1 }} /></Typography>
      ) : (
        statusElements.map((item, idx) => (
          <div className="activity" key={`activity-${idx}`}>
            {item()}
          </div>
        ))
      )}
    </div>
  );
};

export const Presence: React.FC<any> = ({ activities, children }) => {
  return (
    <StyledBox>
      <Tooltip
        arrow
        disableFocusListener
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
