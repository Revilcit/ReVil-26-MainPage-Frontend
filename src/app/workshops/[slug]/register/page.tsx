"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { fetchWorkshopBySlug, registerForWorkshop } from "@/lib/api";
import { Event as ApiEvent } from "@/types/api";
import toast, { Toaster } from "react-hot-toast";

export default function WorkshopRegisterPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [workshop, setWorkshop] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    college: "",
    year: "",
    branch: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const loadWorkshop = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to register for workshops");
          router.push("/login");
          return;
        }

        const data = await fetchWorkshopBySlug(slug);
        setWorkshop(data);
      } catch (error: any) {
        console.error("Failed to load workshop:", error);
        toast.error("Failed to load workshop details");
        router.push("/workshops");
      } finally {
        setLoading(false);
      }
    };

    loadWorkshop();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!workshop?._id) {
        toast.error("Workshop ID not found");
        return;
      }

      await registerForWorkshop(workshop._id, formData);

      toast.success("Successfully registered for workshop!");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.message === "UNAUTHORIZED") {
        toast.error("Please login to register");
        router.push("/login");
      } else {
        toast.error(error.message || "Failed to register for workshop");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-primary font-mono text-xl animate-pulse">
          LOADING WORKSHOP...
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 font-mono text-xl mb-4">
            WORKSHOP NOT FOUND
          </div>
          <button
            onClick={() => router.push("/workshops")}
            className="px-6 py-3 bg-primary text-black font-bold uppercase text-sm hover:bg-white transition-colors"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Workshop Header */}
        <div className="mb-10">
          <button
            onClick={() => router.push("/workshops")}
            className="text-primary hover:text-primary/80 mb-6 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Workshops
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-white font-orbitron mb-3 tracking-tight">
            REGISTER FOR
          </h1>
          <h2 className="text-3xl md:text-4xl text-primary font-orbitron mb-6 tracking-tight">
            {workshop.title}
          </h2>

          <div className="relative w-full h-72 md:h-80 rounded-xl overflow-hidden mb-8 border border-primary/20">
            <Image
              src={workshop.image || "/events/default.jpg"}
              alt={workshop.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 text-primary text-xs uppercase tracking-wider font-semibold rounded mb-3">
                {workshop.type || "Workshop"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Workshop Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-black border border-primary/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary mb-5 font-orbitron tracking-tight">
                About This Workshop
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                {workshop.fullDescription || workshop.description}
              </p>
            </div>

            {/* Prerequisites */}
            {workshop.prerequisites && workshop.prerequisites.length > 0 && (
              <div className="bg-black border border-primary/20 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-5 font-orbitron tracking-tight">
                  Prerequisites
                </h2>
                <ul className="space-y-3">
                  {workshop.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-300 text-base leading-relaxed">
                        {prereq}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Speakers */}
            {workshop.speakers && workshop.speakers.length > 0 && (
              <div className="bg-black border border-primary/20 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-5 font-orbitron tracking-tight">
                  Speakers
                </h2>
                <div className="space-y-5">
                  {workshop.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800/50"
                    >
                      {speaker.photo && (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30">
                          <Image
                            src={speaker.photo}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {speaker.name}
                        </h3>
                        {speaker.bio && (
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {speaker.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:col-span-1">
            <div className="bg-black border border-primary/20 rounded-lg p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6 font-orbitron tracking-tight">
                Register Now
              </h2>

              {/* Workshop Info */}
              <div className="space-y-4 mb-8 pb-6 border-b border-gray-700">
                {workshop.duration && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg
                      className="w-5 h-5 text-primary"
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
                    <span className="text-sm">{workshop.duration}</span>
                  </div>
                )}
                {workshop.capacity && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {workshop.currentRegistrations || 0} / {workshop.capacity}{" "}
                      registered
                    </span>
                  </div>
                )}
                {workshop.fee && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
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
                    <span className="text-lg font-bold text-primary">
                      ₹{workshop.fee}
                    </span>
                  </div>
                )}
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="college"
                    className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    College/Institution *
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your college name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
                    >
                      Year *
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded text-white focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
                    >
                      Branch *
                    </label>
                    <input
                      type="text"
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g., CSE"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Any questions or special requirements?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    submitting ||
                    (workshop.currentRegistrations || 0) >=
                      (workshop.capacity || 0)
                  }
                  className="w-full px-6 py-4 bg-primary text-black font-bold uppercase text-sm tracking-wider hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {submitting
                    ? "Registering..."
                    : (workshop.currentRegistrations || 0) >=
                        (workshop.capacity || 0)
                      ? "Workshop Full"
                      : "Complete Registration"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
