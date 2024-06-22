import { StreamClient } from "@stream-io/node-sdk";

const apiKey = "u3zmx3c2dt2q"
const apiSecret = "qxbrpkjfqqfjj44arqm7b5z4n44jkw94venn25jjzgmqhqvzkqc9tvvxyztu3bus"

export const client = new StreamClient(apiKey, apiSecret) 

