import { GitHub, LinkedIn } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export const Social = () => 
  <div className="social-wrap">
    <Button
      title="My Github"
      size="large"
      data-testid="github-button"
      onClick={() => window.open("https://github.com/Hacksore", "_blank")}
    >
      <GitHub />
    </Button>
    <Button
      title="My Linkedin"
      size="large"
      data-testid="linkedin-button"
      onClick={() =>
        window.open("https://www.linkedin.com/in/seanboult", "_blank")
      }
    >
      <LinkedIn />
    </Button>
  </div>

