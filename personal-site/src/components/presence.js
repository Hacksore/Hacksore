import { Box, styled, Tooltip, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .activity": {
    padding: 4,
    fontWeight: "bold",
    fontSize: 20,
  },
  "& .tooltip": {
    padding: 4
  },
  textAlign: "left",
}));

const PresenceTooltip = ({ activities }) => {
  const statusElements = [];
  activities.forEach(item => {
    const { type, name, state, details } = item;
    if (type === "CUSTOM_STATUS") {
      statusElements.push({
        icon: "📝",
        message: state,
      });
    }

    if (type === "PLAYING") {
      statusElements.push({
        icon: "🎯",
        message: `${name} - ${state}`,
      });
    }

    if (type === "LISTENING") {
      statusElements.push({
        icon: "🎧",
        message: `${state} - ${details}`,
      });
    }
  });

  return (
    <div className="tooltip">
      {statusElements.map(item => (
        <Typography className="activity" key={item.icon}>
          {item.icon} {item.message}
        </Typography>
      ))}
    </div>
  );
};

const Presence = ({ activities, children }) => {
  return (
    <StyledBox>
      <Tooltip
        placement="bottom"
        PopperProps={{
          style: {
            width: 400,
          },
          disablePortal: true,
        }}
        title={<PresenceTooltip activities={activities} />}
      >
        {children}
      </Tooltip>
    </StyledBox>
  );
};

export default Presence;
