import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Extend NextAuth types to include our custom fields
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role?: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        role?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId?: string;
        role?: string | null;
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDB();
                
                try {
                    let dbUser = await User.findOne({ email: user.email });
                    
                    if (!dbUser) {
                        // Create new user for first time Google login
                        dbUser = await User.create({
                            name: user.name,
                            email: user.email,
                            role: null,
                            isEmailVerified: true,
                            oauthProvider: "google",
                        });
                    } else if (!dbUser.oauthProvider) {
                        // Upgrade existing email/password user to Google OAuth
                        dbUser.oauthProvider = "google";
                        await dbUser.save();
                    }

                    // Attach DB info to NextAuth user object for the jwt callback
                    user.id = (dbUser._id as string).toString();
                    user.role = dbUser.role;

                    return true;
                } catch (error) {
                    console.error("Error during Google sign in:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            // Initial sign in: user object is available
            if (user) {
                token.userId = user.id;
                token.role = user.role;
                token.email = user.email;
            }

            // Handle manual session update (e.g. after set-role)
            if (trigger === "update" && session?.role) {
                token.role = session.role;
            }

            return token;
        },
        async session({ session, token }) {
            // Attach custom fields to the session
            if (session.user) {
                session.user.id = token.userId as string;
                session.user.role = token.role as string | null;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
        error: "/auth/error",
    },
});

export { handler as GET, handler as POST };
