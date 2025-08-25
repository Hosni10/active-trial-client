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
import girls from "../assets/girls.jpg";
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
      label: "Active Al Maryah Island",
      days: "Tuesday & Thursday",
      age: "U6 to U18",
      time: "4:45 PM – 9:00 PM",
      locationUrl: "https://maps.app.goo.gl/RuGrvSnHH5HNmiF19?g_st=ipc",
      schedule: [
        { ageGroup: "U18 Elite", time: "4:45 PM - 6:20 PM", duration: "1h 35m" },
        { ageGroup: "U10 Elite", time: "5:00 PM - 6:30 PM", duration: "1h 30m" },
        { ageGroup: "U6, U7", time: "5:30 PM - 6:30 PM", duration: "1h" },
        { ageGroup: "U8, U9, U10 (interm)", time: "5:15 PM - 6:30 PM", duration: "1h 15m" },
        { ageGroup: "U12, U14", time: "6:15 PM - 7:45 PM", duration: "1h 30m" },
        { ageGroup: "U14/U16 Girls", time: "6:15 PM - 7:45 PM", duration: "1h 30m" },
        { ageGroup: "U15 Elite, U16 Elite", time: "7:30 PM - 9:00 PM", duration: "1h 30m" },
      ]
    },
    saadiyat: {
      label: "Saadiyat Theodore School",
      days: "Monday & Wednesday",
      age: "U6 to U16",
      time: "6:30 PM – 8:00 PM",
      locationUrl: "https://maps.app.goo.gl/dri8guSuCdT8zcST7?g_st=ipc",
      schedule: [
        { ageGroup: "U6, U8", time: "6:30 PM - 7:30 PM", duration: "1h" },
        { ageGroup: "U10, U12/13", time: "6:30 PM - 7:50 PM", duration: "1h 20m" },
        { ageGroup: "U12 Elite", time: "6:30 PM - 8:00 PM", duration: "1h 30m", note: "Monday Only" },
        { ageGroup: "U14 Elite", time: "6:30 PM - 8:00 PM", duration: "1h 30m", note: "Wednesday Only" },
        { ageGroup: "U15 Elite", time: "6:30 PM - 8:00 PM", duration: "1h 30m", note: "Wednesday Only" },
        { ageGroup: "U16 Elite", time: "6:30 PM - 8:00 PM", duration: "1h 30m", note: "Monday Only" },
      ]
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

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Atomics Team This Season
              <span className="block text-[#ed3227]">Experience Our Training Methodology</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
            Step onto the pitch with us and experience football like never before — where every session unlocks new skills, builds unstoppable confidence, and sharpens true game intelligence.
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

      {/* Simplified Trial Details Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trial Details
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional 90-minute trial sessions with expert coaching and detailed feedback
            </p>
          </div>

          {/* Location Tabs */}
          <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
            <TabsList className="grid grid-cols-2 max-w-xl mx-auto">
              <TabsTrigger value="mariah">Active Al Maryah Island</TabsTrigger>
              <TabsTrigger value="saadiyat">Saadiyat Theodore School</TabsTrigger>
            </TabsList>

            {/* Active Mariah Island */}
            <TabsContent value="mariah" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Active Al Maryah Island</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">{clinicActivities.scheduleByLocation.mariah.days}</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.mariah.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.mariah.label}</p>
                          <a 
                            href={clinicActivities.scheduleByLocation.mariah.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ed3227] hover:text-[#ed3227]/80 text-sm"
                          >
                            View on Google Maps
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">Age Groups</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.mariah.age}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Professional coaching assessment</li>
                          <li>• Technical skills evaluation</li>
                          <li>• Detailed feedback report</li>
                          <li>• Development recommendations</li>
                        </ul>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 bg-[#ed3227] hover:bg-[#ed3227]/90 text-white" 
                      onClick={() => handlePlanSelect(trialPlan)}
                    >
                      Book Trial Session
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setModalImg({ src: activeImage, alt: "Active Al Maryah Island Football Training" })}>
                  <img 
                    src={activeImage} 
                    alt="Active Al Maryah Island Football Training" 
                    className="w-full h-auto object-cover hover:opacity-90 transition-opacity" 
                  />
                </div>
              </div>
            </TabsContent>

            {/* Saadiyat Island */}
            <TabsContent value="saadiyat" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setModalImg({ src: saadyatImage, alt: "Saadiyat Theodore School Football Training" })}>
                  <img 
                    src={saadyatImage} 
                    alt="Saadiyat Theodore School Football Training" 
                    className="w-full h-auto object-cover hover:opacity-90 transition-opacity" 
                  />
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Saadiyat Theodore School</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">{clinicActivities.scheduleByLocation.saadiyat.days}</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.saadiyat.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.saadiyat.label}</p>
                          <a 
                            href={clinicActivities.scheduleByLocation.saadiyat.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ed3227] hover:text-[#ed3227]/80 text-sm"
                          >
                            View on Google Maps
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#ed3227]" />
                        <div>
                          <p className="font-semibold">Age Groups</p>
                          <p className="text-gray-600">{clinicActivities.scheduleByLocation.saadiyat.age}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Professional coaching assessment</li>
                          <li>• Technical skills evaluation</li>
                          <li>• Detailed feedback report</li>
                          <li>• Development recommendations</li>
                        </ul>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 bg-[#ed3227] hover:bg-[#ed3227]/90 text-white" 
                      onClick={() => handlePlanSelect(trialPlan)}
                    >
                      Book Trial Session
                    </Button>
                  </div>
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
                  src: girls,
                  alt: "Atomics Football Training",
                })
              }
            >
              <img
                src={girls}
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

      {/* Detailed Schedule Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#ed3227] text-white hover:bg-[#ed3227]/90">
              Term 1 Training 2025/2026
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Training Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional training sessions tailored for different age groups and skill levels. Each session is designed to maximize player development and performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Active Al Maryah Island Schedule */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-[#ed3227]" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Active Al Maryah Island</CardTitle>
                <CardDescription className="text-lg font-semibold text-[#ed3227]">
                  Tuesday & Thursday
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clinicActivities.scheduleByLocation.mariah.schedule.map((session, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{session.ageGroup}</h4>
                        <p className="text-gray-600 text-sm">{session.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-[#ed3227] text-white text-xs">
                          {session.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a 
                    href={clinicActivities.scheduleByLocation.mariah.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full text-[#ed3227] hover:text-[#ed3227]/80 font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Location on Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Saadiyat Theodore School Schedule */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-[#ed3227]" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Saadiyat Theodore School</CardTitle>
                <CardDescription className="text-lg font-semibold text-[#ed3227]">
                  Monday & Wednesday
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clinicActivities.scheduleByLocation.saadiyat.schedule.map((session, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{session.ageGroup}</h4>
                        <p className="text-gray-600 text-sm">{session.time}</p>
                        {session.note && (
                          <p className="text-[#ed3227] text-xs font-medium mt-1">{session.note}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className="bg-[#ed3227] text-white text-xs">
                          {session.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a 
                    href={clinicActivities.scheduleByLocation.saadiyat.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full text-[#ed3227] hover:text-[#ed3227]/80 font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Location on Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ed3227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#ed3227]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Session Duration</h3>
              <p className="text-gray-600">1-1.5 hours per session depending on age group and skill level</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ed3227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#ed3227]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Age Groups</h3>
              <p className="text-gray-600">U6 to U18 with specialized Elite programs for advanced players</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ed3227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-[#ed3227]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Elite Programs</h3>
              <p className="text-gray-600">Advanced training for serious players with competitive aspirations</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-[#ed3227]/10 rounded-full px-6 py-3">
              <span className="text-2xl">🎯</span>
              <span className="text-lg font-semibold text-[#ed3227]">
                Limited slots available – serious players only!
              </span>
            </div>
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
