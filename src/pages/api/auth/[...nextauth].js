import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch("http://104.251.211.125:8055/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en-US",
          },
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error("Wrong username or password");
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "SUPER_SECRET_JWT_SECRET",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const res = await fetch("http://104.251.211.125:8055/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en-US",
            Authorization: `Bearer ${user.data.access_token}`,
          },
        });
        const { data: details } = await res.json();
        return {
          ...token,
          details,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.details = token.details;

      return session;
    },
  },
};
export default NextAuth(authOptions);
