import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null;

const getArcanaAuthProvider = () => {
  const arcanaClientId = process.env.ARCANA_CLIENT_ID;
  if(arcanaClientId == undefined) {
    console.error("arcana client id not found or is undefined");
    return;
  }
  if (!auth) {
    auth = new AuthProvider(arcanaClientId);
  }
  return auth;
};

export { getArcanaAuthProvider };