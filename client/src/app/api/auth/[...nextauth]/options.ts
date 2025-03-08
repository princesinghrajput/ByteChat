import {AuthOptions, ISODateString} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";

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
      try {
        if (account?.provider === "google") {
          const payload = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            oauth_id: account?.providerAccountId,
          };
          
          console.log('Attempting to login with payload:', payload);
          console.log('Login URL:', LOGIN_URL);

          const response = await axios.post(LOGIN_URL, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('Login response:', response.data);

          if (response.data?.user) {
            user.id = response.data.user.id.toString();
            user.token = response.data.user.token;
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Login error:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
        }
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