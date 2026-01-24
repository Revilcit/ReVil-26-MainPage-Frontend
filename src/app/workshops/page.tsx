"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchWorkshops } from "@/lib/api";
import { Event as ApiEvent } from "@/types/api";
import toast, { Toaster } from "react-hot-toast";
import { LazyMotion, domAnimation, m } from "framer-motion";
import TiltedCard from "@/components/ui/TiltedCard";

interface Workshop extends ApiEvent {
  learningOutcomes?: string[];
  prerequisites?: string[];
}

export default function WorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const workshopEvents = await fetchWorkshops();
        setWorkshops(workshopEvents);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
        toast.error("Failed to load workshops");
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const handleRegisterClick = (workshop: Workshop) => {
    // Check if user is logged in
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      toast("Please login to register for workshops", {
        icon: "🔐",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      router.push("/login");
      return;
    }

    // Navigate to workshop registration page
    if (workshop.slug) {
      router.push(`/workshops/${workshop.slug}/register`);
    } else {
      toast.error("Workshop registration not available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#00E5FF] text-2xl font-mono animate-pulse">
          LOADING WORKSHOPS...
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-black py-24 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header Section */}
          <m.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-4 glitch-text uppercase tracking-tighter"
          >
            WORKSHOPS
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-xl mb-16 max-w-3xl border-l-4 border-[#00E5FF]/30 pl-6"
          >
            Hands-on training sessions led by industry experts. Level up your
            skills with practical, immersive learning experiences.
          </m.p>

          {/* Workshops Grid - 3-column layout for 3 workshops */}
          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {workshops.map((workshop, index) => (
                <m.div
                  key={workshop._id || workshop.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <TiltedCard
                    containerHeight="100%"
                    containerWidth="100%"
                    scaleOnHover={1.02}
                    rotateAmplitude={8}
                  >
                    <div className="relative w-full h-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden hover:border-[#00E5FF]/40 transition-all flex flex-col">
                      {/* Image Section */}
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={workshop.image || "/events/default.jpg"}
                          alt={workshop.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                        {/* Type Badge */}
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-3 py-1 bg-[#00E5FF] text-black text-xs font-bold uppercase tracking-wider">
                            {workshop.type}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col grow">
                        <h2 className="text-white font-bold text-xl mb-3 leading-tight">
                          {workshop.title}
                        </h2>

                        <p className="text-gray-300 text-sm leading-relaxed mb-4 grow line-clamp-3">
                          {workshop.description}
                        </p>

                        {/* Workshop Info */}
                        <div className="space-y-2 mb-4 text-sm">
                          {workshop.duration && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <svg
                                className="w-4 h-4 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{workshop.duration}</span>
                            </div>
                          )}
                          {workshop.fee && (
                            <div className="flex items-center gap-2 text-primary font-bold">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>₹{workshop.fee}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleRegisterClick(workshop)}
                          className="w-full px-4 py-2 text-sm bg-white text-black border border-white font-bold tracking-wider hover:bg-black hover:text-white transition-all uppercase"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </TiltedCard>
                </m.div>
              ))}
            </div>
          ) : (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                No Workshops Yet!
              </h2>
              <p className="text-gray-400 text-xl">
                Check back soon for exciting hands-on training sessions.
              </p>
            </m.div>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </LazyMotion>
  );
}
