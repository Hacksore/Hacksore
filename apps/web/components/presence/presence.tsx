import { Box, styled, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Activity } from "../../types/activities";

const StyledBox = styled(Box)(() => ({
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
    fontSize: 20,
    fontWeight: "bold",
  },
  "& .body": {
    fontSize: 18,
  },
}));

const CurrentStatus = ({ state }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <Typography className="header">{state}</Typography>
    </div>
  );
};

const PlayingActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <Typography className="header">🕹 {name}</Typography>
      <Typography className="body">{state}</Typography>
      <Typography className="body">{details}</Typography>
    </div>
  );
};

const ListeningActivity = ({ name, state, details }: { name: string; state: string; details: string }) => {
  return (
    <div>
      <Typography className="header">🎧 {name}</Typography>
      <Typography className="body">{state}</Typography>
      <Typography className="body">{details}</Typography>
    </div>
  );
};

const PresenceTooltip: React.FC<{ activities: Activity[] }> = ({ activities = [] }) => {
  const statusElements: Function[] = [];
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
        <Typography sx={{ fontWeight: "bold" }}>No current activities 😴</Typography>
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
