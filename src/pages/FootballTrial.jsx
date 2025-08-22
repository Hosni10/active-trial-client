import React, { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx";
import {
  Star,
  Users,
  Check,
  Calendar,
  Trophy,
  Target,
  Clock,
  MapPin,
  X,
  ExternalLink,
  Sparkles,
  Globe,
  Lightbulb,
} from "lucide-react";
import activeImage from "../assets/active.jpg";
import saadyatImage from "../assets/saadyat.jpg";

import backgroundImage from "../assets/background.jpeg";
import BookingForm from "../components/BookingForm.jsx";

const trialPlan = {
  name: "Trial Session",
  description: "One-time training session to experience our program",
  price: "0",
  features: [
    "Professional coaching",
    "Open to U6–U18",
    "Training equipment provided",
  ],
};

const clinicActivities = {
  focusAreas: [
    "Technical Skills",
    "Tactical Understanding",
    "Physical Conditioning",
    "Mental Preparation",
  ],
  scheduleByLocation: {
    mariah: {
      label: "Active Mariah Island",
      days: "Tuesday & Thursday",
      age: "U6 to U18",
      time: "5:00 PM – 9:00 PM",
      locationUrl: "https://maps.app.goo.gl/RuGrvSnHH5HNmiF19?g_st=ipc",
    },
    saadiyat: {
      label: "Saadiyat Island (Theodore Monod French School)",
      days: "Monday & Wednesday",
      age: "U6 to U18",
      time: "6:30 PM – 8:30 PM",
      locationUrl: "https://maps.app.goo.gl/dri8guSuCdT8zcST7?g_st=ipc",
    },
  },
  skillsDevelopment: [
    "Ball control and dribbling",
    "Passing and receiving",
    "Shooting techniques",
    "Defensive positioning",
    "Game strategy and tactics",
  ],
  benefits: [
    "Improve football skills",
    "Build confidence",
    "Develop teamwork",
    "Enhance fitness levels",
    "Learn from professionals",
  ],
};

function ImageModal({ src, alt, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-w-[95vw] max-h-[95vh] w-auto h-auto flex flex-col items-center">
        {/* Close button */}
        <button
          className="absolute -top-12 right-0 text-white hover:text-red-400 text-3xl font-bold transition-colors duration-200 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Image container */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            style={{
              maxWidth: "min(95vw, 1200px)",
              maxHeight: "85vh",
            }}
          />
        </div>

        {/* Click outside to close */}
        <div className="absolute inset-0 -z-10" onClick={onClose} />
      </div>
    </div>
  );
}

function FootballTrial() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [activeLocation, setActiveLocation] = useState("mariah");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (data) => {
    console.log("Booking submitted:", data);
    setShowBookingForm(false);
    // The BookingForm handles everything internally now
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-[#ed3227]/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center text-white">
          <div className="mb-8">
            <Badge className="mb-4 bg-[#ed3227] text-white hover:bg-[#ed3227]/90">
              Football Trial
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Trial
              <span className="block text-[#ed3227]">Experience Our Training</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Try a session at one of our locations and see how our coaching
              helps players develop skills, confidence, and game intelligence.
            </p>
            <Button
              className="bg-[#ed3227] hover:bg-[#ed3227]/90 text-white px-8 py-6 text-lg"
              onClick={() =>
                document
                  .getElementById("pricing")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Your Trial Session
            </Button>
          </div>
        </div>
      </section>

      {/* Camp Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Camp Details
            </h2>
          </div>

          <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
            <TabsList className="grid grid-cols-2 max-w-xl mx-auto">
              <TabsTrigger value="mariah">Active Mariah Island</TabsTrigger>
              <TabsTrigger value="saadiyat">Saadiyat Island</TabsTrigger>
            </TabsList>

            {/* Active Mariah Island */}
            <TabsContent value="mariah">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Schedule</h3>
                        <p className="text-gray-600">
                          {clinicActivities.scheduleByLocation.mariah.days}
                          <br />
                          {clinicActivities.scheduleByLocation.mariah.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-600">{clinicActivities.scheduleByLocation.mariah.label}</p>
                        <a 
                          href={clinicActivities.scheduleByLocation.mariah.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#ed3227] hover:text-[#ed3227]/80 text-sm mt-1 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Age Groups</h3>
                        <p className="text-gray-600">{clinicActivities.scheduleByLocation.mariah.age}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#ed3227] hover:bg-[#ed3227]/90 text-white" onClick={() => handlePlanSelect(trialPlan)}>
                    Book Trial at Active Mariah Island
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setModalImg({ src: activeImage, alt: "Active Mariah Island Football Training" })}>
                  <img src={activeImage} alt="Active Mariah Island Football Training" className="w-full h-auto max-h-[600px] object-contain hover:opacity-80 transition-opacity" />
                </div>
              </div>
            </TabsContent>

            {/* Saadiyat Island */}
            <TabsContent value="saadiyat">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Schedule</h3>
                        <p className="text-gray-600">
                          {clinicActivities.scheduleByLocation.saadiyat.days}
                          <br />
                          {clinicActivities.scheduleByLocation.saadiyat.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-600">{clinicActivities.scheduleByLocation.saadiyat.label}</p>
                        <a 
                          href={clinicActivities.scheduleByLocation.saadiyat.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#ed3227] hover:text-[#ed3227]/80 text-sm mt-1 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-[#ed3227] mt-1" />
                      <div>
                        <h3 className="font-semibold">Age Groups</h3>
                        <p className="text-gray-600">{clinicActivities.scheduleByLocation.saadiyat.age}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#ed3227] hover:bg-[#ed3227]/90 text-white" onClick={() => handlePlanSelect(trialPlan)}>
                    Book Trial at Saadiyat Island
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setModalImg({ src: saadyatImage, alt: "Saadiyat Island Football Training" })}>
                  <img src={saadyatImage} alt="Saadiyat Island Football Training" className="w-full h-auto max-h-[600px] object-contain hover:opacity-80 transition-opacity" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Atomics Stands Out Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-[#ed3227]" />
              Why Atomics Stands Out
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our football training program unique and why players choose Atomics
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() =>
                setModalImg({
                  src: activeImage,
                  alt: "Atomics Football Training",
                })
              }
            >
              <img
                src={activeImage}
                alt="Atomics Football Training"
                className="w-full h-auto max-h-[600px] object-contain hover:opacity-80 transition-opacity"
              />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Trophy className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Champion-level coaching</h4>
                    <p className="text-sm text-gray-600">with international experience (Europe & beyond)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Target className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Reality-based training</h4>
                    <p className="text-sm text-gray-600">tailored to each level of player</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Star className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">High match exposure</h4>
                    <p className="text-sm text-gray-600">for real competitive development</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Users className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Limited players per team</h4>
                    <p className="text-sm text-gray-600">to ensure quality learning</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <MapPin className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Spacious facilities</h4>
                    <p className="text-sm text-gray-600">designed like real-game settings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Globe className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multinational coaches</h4>
                    <p className="text-sm text-gray-600">fluent in English, Arabic & Spanish</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Lightbulb className="h-6 w-6 text-[#ed3227] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Strong values, sportsmanship & discipline</h4>
                    <p className="text-sm text-gray-600">at the core of our training</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Training Schedule
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured training sessions designed for different age groups
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(clinicActivities.scheduleByLocation).map(([key, info], index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock className="h-8 w-8 text-[#ed3227] mx-auto mb-2" />
                  <CardTitle className="text-lg">{info.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold text-[#ed3227]">{info.days}</div>
                    <div className="text-gray-800">{info.age}</div>
                    <div className="text-gray-800">{info.time}</div>
                    <a 
                      href={info.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-[#ed3227] hover:text-[#ed3227]/80 text-sm mt-3 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      View Location
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 text-lg font-semibold text-[#ed3227]">
              🎯 Limited slots available – serious players only!
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your Trial
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your preferred location and book a one-time trial session
            </p>
          </div>

          {/* Location Display */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#ed3227] text-white px-6 py-3 rounded-lg font-medium">
              <MapPin className="h-4 w-4 inline mr-2" />
              {activeLocation === "mariah"
                ? clinicActivities.scheduleByLocation.mariah.label
                : clinicActivities.scheduleByLocation.saadiyat.label}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{trialPlan.name}</CardTitle>
                <CardDescription>{trialPlan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <span className="text-3xl font-bold">AED {trialPlan.price}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {trialPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-[#ed3227] mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#ed3227] hover:bg-[#ed3227]/90 text-white mt-auto" onClick={() => handlePlanSelect(trialPlan)}>
                  Book Trial Session
                </Button>
              </CardContent>
            </Card>
          </div>


        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && selectedPlan && (
        <BookingForm
          selectedPlan={selectedPlan}
          selectedLocation={activeLocation}
          campType="footballClinic"
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Image Modal */}
      <ImageModal
        src={modalImg?.src}
        alt={modalImg?.alt}
        open={!!modalImg}
        onClose={() => setModalImg(null)}
      />
    </>
  );
}

export default FootballTrial;
