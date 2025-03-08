import {AuthOptions, ISODateString} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { NextAuthOptions } from "next-auth";

export interface CustomSession{
    user?:CustomUser;
    expires:ISODateString;
}

export interface CustomUser{
    id?:string | null;
    name?:string | null;
    email?:string | null;
    image?:string | null;
    provider?:string | null;
    token?:string | null;

}
export const authOptions: AuthOptions = {
  pages:{
    signIn:"/login"
  },
  callbacks:{
    async signIn({ user, account }:{user:CustomUser, account:any}) {
        try{
          const payload = {
            name: user.name,
            email: user.email,
            provider: account?.provider,
            image: user?.image,
            oauth_id: account?.providerAccountId,
          }
          const {data} = await axios.post(LOGIN_URL, payload);
          user.id = data?.user?.id.toString();
          user.token = data?.user?.token;
          return true;
        }catch(error){
          console.log(error);
          return false;
        }
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
      async session({ session, user, token }:{session:CustomSession, user:CustomUser, token:any}) {
        if(token.user){
            session.user = token.user as CustomUser;
        }
        return session;
      },
      async jwt({ token, user }) {
        if(user){
            token.user = user;
        }
        return token
      }

  },
  providers:[
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
    }),
  ]
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
};