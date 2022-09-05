// TODO: do some CF tunnel magic to have the pi pull the latest image
import { execSync} from "child_process";

const { RASPBERRY_PI_IP } = process.env;

// run a build first
execSync("yarn build", {
  stdio: "inherit"
});

// push the build to docker reg
execSync("docker push hacksore/presence-bot:latest",  {
  stdio: "inherit"
});

// tell pi to update image
execSync(`ssh pi@${RASPBERRY_PI_IP} -C /home/pi/discord-bot/update.sh`,  {
  stdio: "inherit"
});