import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";
import "dotenv/config";

const { DISCORD_TOKEN, FIREBASE_SA_BASE64 } = process.env;

export class DiscordPresenceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a vpc
    const vpc = new ec2.Vpc(this, "DiscordPresenceVpc", {
      maxAzs: 1,
    });

    // create a cluster
    const cluster = new ecs.Cluster(this, "DiscordPresenceCluster", {
      vpc: vpc,
    });

    if (DISCORD_TOKEN === undefined) {
      throw new Error("DISCORD_TOKEN must be set!");
    }

    if (FIREBASE_SA_BASE64 === undefined) {
      throw new Error("FIREBASE_SA_BASE64 must be set!");
    }

    const taskDefinition = new ecs.FargateTaskDefinition(this, "DiscordPresenceTask");
    taskDefinition.addContainer("DiscordPresenceContainer", {
      image: ecs.ContainerImage.fromRegistry("hacksore/presence-bot:latest"),
      memoryLimitMiB: 256,
      environment: {
        DISCORD_TOKEN,
        FIREBASE_SA_BASE64,
      },
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "DiscordPresence", logRetention: 7 }),
    });

    // deploy to fargate
    new ecs.FargateService(this, "DiscordPresenceService", {
      cluster,
      taskDefinition,
    });
  }
}
