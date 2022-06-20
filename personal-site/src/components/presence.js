import { Box, styled, Tooltip, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .activity": {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  textAlign: "left"
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

  console.log(statusElements)

  return statusElements.map(item => <Typography className="activity" key={item.icon}>{item.icon} {item.message}</Typography>);
};

const Presence = ({ activities, children }) => {
  console.log(activities, children);
  return (
    <StyledBox>
      <Tooltip
        placement="bottom"
        PopperProps={{
          style: {
            width: 420,
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
