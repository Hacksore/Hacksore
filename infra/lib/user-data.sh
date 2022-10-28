#!/bin/sh
sudo yum update -y

sudo amazon-linux-extras install docker
sudo service docker start

sudo systemctl enable docker
sudo usermod -a -G docker ec2-user