const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const app = express();
const got = require("got");

const config = functions.config();
const collectionRef = db.collection("github");

const headersForGithub = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
  Authorization: `token ${config.token.value}`,
};

(async () => {
  const doc = await collectionRef.doc("metadata").get();
  if (!doc.exists) {
    await collectionRef.doc("metadata").set({
      views: 0,
    });
  }
})();

const getRepoData = async () => {
  const response = await got({
    url: "https://api.github.com/user/repos?page=1&per_page=150",
    headers: headersForGithub,
  });

  const json = JSON.parse(response.body);

  let stars = 0;
  json
    .filter((item) => item.owner.login === "Hacksore")
    .map((item) => {
      return {
        stars: item.stargazers_count,
      };
    })
    .forEach((item) => {
      stars += item.stars;
    });

  return stars;
};

const addView = async () => {
  const doc = await collectionRef.doc("metadata").get();
  if (doc.exists) {
    const data = doc.data();

    const newViews = data.views + 1;
    await collectionRef.doc("metadata").set({
      views: newViews,
    });

    return newViews;
  }
};

app.get("/stars", async (req, res) => {
  const stars = await getRepoData();

  res.send({
    schemaVersion: 1,
    label: "Stars Received",
    message: `${stars}`,
    color: "green",
  });
});

app.get("/views", async (req, res) => {
  const views = await addView();

  res.send({
    schemaVersion: 1,
    label: "Profile Views",
    message: `${views}`,
    color: "green",
  });
});

exports.app = functions.https.onRequest(app);
