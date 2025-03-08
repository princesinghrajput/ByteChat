import FeatureSection from "@/components/ui/base/FeatureSection";
import Footer from "@/components/ui/base/Footer";
import HeroSection from "@/components/ui/base/HeroSection";
import Navbar from "@/components/ui/base/Navbar";
import UserReviews from "@/components/ui/base/UserReviews";
import { authOptions, CustomSession, CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session:CustomSession | null = await getServerSession(authOptions);
  const user = session?.user as CustomUser;

  return (
    <div className="min-h-screen flex flex-col ">
    {/* Header */}
    <Navbar user={user}/> 
    {/* Hero Section */}
    <HeroSection />

    {/* Features Section */}
    <FeatureSection />

    {/* User Reviews Section */}
    <UserReviews />

    {/* Footer */}
    <Footer />
  </div>
  );
}
