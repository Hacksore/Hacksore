import { TextField, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { RepoItem } from "../components/repo-item";

function Webhooks() {
  const [webhooks, setWebhooks] = useState({});
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchHooks = async () => {
      const response = await fetch("/api/hooks").then(res => res.json());
      setWebhooks(response);
    };

    fetchHooks();
  }, []);

  return (
    <Box sx={{ width: 700 }}>
      <Box sx={{ display: "flex" }}>
        <TextField onChange={(e) => setName(e.target.value)} placeholder="Enter a repo name" />
        <Button
          variant="contained"
          onClick={() => {
            fetch("/api/hooks", {
              method: "POST",
              body: JSON.stringify({
                name
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          }}
        >
          Create new Webhook
        </Button>
        {name}
      </Box>
      {Object.entries(webhooks).map(([key, value]) => {
        return (
          <div key={key} style={{ width: "100%" }}>
            <RepoItem repoName={key} data={value} />
          </div>
        );
      })}
    </Box>
  );
}

export default Webhooks;
