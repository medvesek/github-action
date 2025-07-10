import Cloudflare from "cloudflare";
import CloudflareClient from "./cloudflare.js";

export default async function createCloudflareRecord({
  hostname,
  apiToken,
  targetIp,
}) {
  const client = new CloudflareClient(new Cloudflare({ apiToken }));

  const zone = client.findZone(hostname);
  if (!zone) {
    throw new Error(`Zone for ${hostname} not found`);
  }
  const record = client.findRecord(zone.id, hostname);

  if (!record) {
    await client.createDnsRecord({
      zoneId: zone.id,
      name: hostname,
      content: targetIp,
    });
    console.log(`Record for ${hostname} created!`);
  } else if (record.content !== targetIp) {
    console.log(`Record for ${hostname} updated!`);
    await client.updateDnsRecord({
      recordId: record.id,
      zoneId: zone.id,
      name: hostname,
      content: targetIp,
    });
  } else {
    console.log(
      `Record for ${hostname} already exists and is configured correctly!`
    );
  }
}
