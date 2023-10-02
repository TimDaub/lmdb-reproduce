import { resolve } from "path";
import { open } from "lmdb";

export async function run() {
  const db = open({
    compression: true,
    name: "constraints",
    encoding: "cbor",
    keyEncoding: "ordered-binary",
    path: resolve("./db"),
    maxReaders: 500,
  });

  const addr = "0xee324c588ceF1BF1c1360883E4318834af66366d";
  const url = "https://calendly.com/resources/ebooks/forrester-tei";
  const type = "amplify";
  const key = `${addr}:${url}:${type}`;
  console.log("doesExist", await db.doesExist(key));
  console.log("get", await db.get(key));
  console.log("getEntry", await db.getEntry(key));
  const all = Array.from(await db.getRange());
  const result = all.find((obj) => obj.key === key);
  console.log("manual doesExist", result);
  //doesExist true
  //get undefined
  //getEntry undefined
  //manual doesExist {
  //  key: '0xee324c588ceF1BF1c1360883E4318834af66366d:https://calendly.com/resources/ebooks/forrester-tei:amplify',
  //  value: undefined
  //}
}

run();
