import * as core from "@actions/core";
import * as github from "@actions/github";
import Cloudflare from "cloudflare";

try {
  const client = new Cloudflare();
  const zones = await client.zones.list();
  console.log(zones);
} catch (error) {
  // Handle errors and indicate failure
  core.setFailed(error.message);
}
