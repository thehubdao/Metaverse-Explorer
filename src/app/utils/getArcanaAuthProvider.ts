import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null;

const getArcanaAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      process.env.ARCANA_CLIENT_ID!
    );
  }
  return auth;
};

export { getArcanaAuthProvider };