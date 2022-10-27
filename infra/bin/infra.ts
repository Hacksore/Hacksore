#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DiscordPresenceStack } from "../lib/infra-stack";
import "dotenv/config";

const { CDK_DEFAULT_ACCOUNT, CDK_DEFAULT_REGION } = process.env;
const app = new cdk.App();
new DiscordPresenceStack(app, "DiscordPresenceStack", {
  env: { account: CDK_DEFAULT_ACCOUNT, region: CDK_DEFAULT_REGION },
});
