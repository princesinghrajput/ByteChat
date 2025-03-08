import {AuthOptions, ISODateString} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


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
    async signIn({ user, account }) {
        console.log("user and account:",user, account);
        return true
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