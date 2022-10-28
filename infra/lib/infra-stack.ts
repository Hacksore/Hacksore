import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { readFileSync } from "fs";
// import { Octokit } from "octokit";

import { Construct } from "constructs";
import "dotenv/config";

// const { GITHUB_TOKEN } = process.env;
// const octokit = new Octokit({ auth: GITHUB_TOKEN });
export class DiscordPresenceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // create a vpc
    const vpc = new ec2.Vpc(this, "DiscordPresenceVPC", {
      cidr: "10.0.0.0/16",
      natGateways: 0,
      subnetConfiguration: [{ name: "public", cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC }],
    });

    const role = new iam.Role(this, "DiscordPresenceRole", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });

    const securityGroup = new ec2.SecurityGroup(this, "DiscordPresenceSg", {
      vpc,
      allowAllOutbound: true,
      securityGroupName: "DiscordPresenceSg",
    });

    // lets use the security group to allow inbound traffic on specific ports
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "Allows SSH access from Internet");

    // Finally lets provision our ec2 instance
    const ec2Instance = new ec2.Instance(this, "DiscordPresence", {
      vpc,
      role: role,
      securityGroup,
      instanceName: "DiscordPresence",
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.NANO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: "DiscordPresenceKey",
    });

    // 👇 load user data script
    const userDataScript = readFileSync("./lib/user-data.sh", "utf8");

    // 👇 add user data to the EC2 instance
    ec2Instance.addUserData(userDataScript);

    // // set github action
    // octokit.rest.actions.createOrUpdateRepoSecret({
    //   owner: "Hacksore",
    //   repo: "Hacksore",
    //   secret_name: "EC2_INSTANCE_IP",
    //   encrypted_value: ec2Instance.instancePublicIp,
    // });

    // set inside of cf
    new cdk.CfnOutput(this, "DiscordPresenceIp", {
      value: ec2Instance.instancePublicIp,
    });
  }
}
