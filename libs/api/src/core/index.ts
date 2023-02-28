export async function getAllRepos(db: any) {
  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();
  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();
  // pull out the webhook url from the db

  return Object.keys(configuredWebhooks);
}