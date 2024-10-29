import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import Portfoliocard from "@/components/Portfoliocard";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogCard />
      <Portfoliocard />
      <Testimonial />
      <Footer />
    </>
  );
}
