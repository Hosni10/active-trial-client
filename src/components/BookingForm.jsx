import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Badge } from "./ui/badge.jsx";
import { Checkbox } from "./ui/checkbox.jsx";
import { X, Calendar, User, Phone, Trophy, Target, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";

const BookingForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playerFirstName: "",
    playerLastName: "",
    teamName: "",
    dateOfBirth: "",
    playingPosition: "",
    divisionLastSeason: "",
    strengthWeakness: "",
    mobileNumber: "",
    email: "",
    academyClub: "",
    preferredLocations: [],
    trialDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const playingPositions = [
    "GK", "CB", "RB", "LB", "CDM", "CM", "CAM", "LW", "RW", "ST"
  ];

    const availableLocations = [
    { id: "active-mariah", name: "Active Mariah Island", address: "Mariah Island, Abu Dhabi" },
    { id: "saadiyat", name: "Saadiyat Island", address: "Theodore Monod French School, Saadiyat" },
  ];

  const trialDates = [
    { date: "2025-08-26", label: "Tuesday, 26th August", time: "5:00 PM - 9:00 PM" },
    { date: "2025-08-27", label: "Wednesday, 27th August", time: "5:00 PM - 9:00 PM" },
    { date: "2025-08-28", label: "Thursday, 28th August", time: "5:00 PM - 9:00 PM" },
  ];

  const getRandomTrialDate = () => {
    const randomIndex = Math.floor(Math.random() * trialDates.length);
    return trialDates[randomIndex].date;
  };

  const validateForm = () => {
    const errors = {};

    // Basic validation
    if (!formData.playerFirstName.trim()) {
      errors.playerFirstName = "Player first name is required";
    } else if (formData.playerFirstName.trim().length < 2) {
      errors.playerFirstName = "First name must be at least 2 characters";
    }

    if (!formData.playerLastName.trim()) {
      errors.playerLastName = "Player last name is required";
    } else if (formData.playerLastName.trim().length < 2) {
      errors.playerLastName = "Last name must be at least 2 characters";
    }

    if (!formData.teamName.trim()) {
      errors.teamName = "Team name is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.playingPosition) {
      errors.playingPosition = "Playing position is required";
    }

    if (!formData.divisionLastSeason.trim()) {
      errors.divisionLastSeason = "Division competed at last season is required";
    }

    if (!formData.strengthWeakness.trim()) {
      errors.strengthWeakness = "Please provide 1 strength & 1 weakness";
    }

    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      // UAE Phone validation
      const uaePhoneRegex = /^(\+971|971|0)?[2-9][0-9]{8}$/;
      if (!uaePhoneRegex.test(formData.mobileNumber.replace(/\s/g, ""))) {
        errors.mobileNumber = "Please enter a valid UAE phone number (e.g., 0501234567, +971501234567)";
      }
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }



    if (!formData.academyClub.trim()) {
      errors.academyClub = "Academy/Club is required";
    }

    if (formData.preferredLocations.length === 0) {
      errors.preferredLocations = "Please select a preferred location";
    }

    // Trial date is optional - if not selected, we'll assign randomly
    // No validation needed here as we handle it in submission

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleLocationChange = (locationId) => {
    setFormData({ ...formData, preferredLocations: [locationId] });
    
    // Clear error when user makes a selection
    if (errors.preferredLocations) {
      setErrors({ ...errors, preferredLocations: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Assign random trial date if not selected
    const finalTrialDate = formData.trialDate || getRandomTrialDate();
    const selectedTrialDate = trialDates.find(d => d.date === finalTrialDate);

    const registrationPayload = {
      ...formData,
      trialDate: finalTrialDate,
      trialDateLabel: selectedTrialDate?.label || "Randomly Assigned",
      tournament: "ATOMICS PRESEASON CUP",
      cupDates: "Tuesday - Thursday 26th - 28th August",
      timings: "5:00 PM to 9:00 PM",
      location: "Active Sports Pitches",
      registrationDate: new Date().toISOString(),
    };

    try {
      console.log("Submitting tournament registration...");
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL || "http://localhost:5000"
        }/api/tournament-registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationPayload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to submit registration."
        );
      }

      console.log("Registration submitted successfully:", result);
      toast.success("Registration submitted successfully! You will receive a confirmation shortly.");

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error(
        error.message || "An error occurred while submitting your registration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-center w-full">ATOMICS PRESEASON CUP</h2>
              <div className="text-center mt-2">
                <Badge className="bg-green-600 text-white mb-2">
                  Free Registration
                </Badge>
                <p className="text-gray-600 text-sm">
                  1000 AED Award & Player Investment Programs
                </p>
                <p className="text-gray-600 text-sm">
                  Opportunity to get selected to be part of our Elite team & Compete at Local and International level
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Tournament Details */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Cup Dates</p>
                  <p className="text-xs text-gray-600">Tuesday - Thursday</p>
                  <p className="text-xs text-gray-600">26th - 28th August</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Timings</p>
                  <p className="text-xs text-gray-600">5:00 PM to 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Location</p>
                  <p className="text-xs text-gray-600">Active Sports Pitches</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Player Information */}
            <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                Player Information
              </h3>
              
              <div className="grid gap-6">
                {/* Name Fields - Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="playerFirstName" className="text-sm font-medium text-gray-700">
                      Player First Name *
                    </Label>
                    <Input
                      id="playerFirstName"
                      placeholder="Enter player's first name"
                      value={formData.playerFirstName}
                      onChange={(e) => handleInputChange("playerFirstName", e.target.value)}
                      className="h-11"
                    />
                    {errors.playerFirstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.playerFirstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playerLastName" className="text-sm font-medium text-gray-700">
                      Player Last Name *
                    </Label>
                    <Input
                      id="playerLastName"
                      placeholder="Enter player's last name"
                      value={formData.playerLastName}
                      onChange={(e) => handleInputChange("playerLastName", e.target.value)}
                      className="h-11"
                    />
                    {errors.playerLastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.playerLastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-sm font-medium text-gray-700">
                    Your Team Name for this Tournament *
                  </Label>
                  <Input
                    id="teamName"
                    placeholder="If you don't have a team, write 'Atomics' and we will find you a team!"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange("teamName", e.target.value)}
                    className="h-11"
                  />
                  {errors.teamName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.teamName}
                    </p>
                  )}
                </div>

                {/* Date of Birth and Position - Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="h-11"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="playingPosition" className="text-sm font-medium text-gray-700">
                      Playing Position *
                    </Label>
                    <Select
                      value={formData.playingPosition}
                      onValueChange={(value) => handleInputChange("playingPosition", value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your playing position" />
                      </SelectTrigger>
                      <SelectContent>
                        {playingPositions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.playingPosition && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.playingPosition}
                      </p>
                    )}
                  </div>
                </div>

                {/* Division */}
                <div className="space-y-2">
                  <Label htmlFor="divisionLastSeason" className="text-sm font-medium text-gray-700">
                    Which Division you competed at last season? *
                  </Label>
                  <Input
                    id="divisionLastSeason"
                    placeholder="e.g., U12, U14, U16, Senior Division, etc."
                    value={formData.divisionLastSeason}
                    onChange={(e) => handleInputChange("divisionLastSeason", e.target.value)}
                    className="h-11"
                  />
                  {errors.divisionLastSeason && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.divisionLastSeason}
                    </p>
                  )}
                </div>

                {/* Strength & Weakness */}
                <div className="space-y-2">
                  <Label htmlFor="strengthWeakness" className="text-sm font-medium text-gray-700">
                    1 Strength & 1 Weakness *
                  </Label>
                  <Textarea
                    id="strengthWeakness"
                    placeholder="Describe your main strength and one area you want to improve"
                    value={formData.strengthWeakness}
                    onChange={(e) => handleInputChange("strengthWeakness", e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  {errors.strengthWeakness && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.strengthWeakness}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    Contact Information
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700">
                        Mobile Number (UAE) *
                      </Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="e.g., 0501234567 or +971501234567"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        className="h-11"
                      />
                      <p className="text-xs text-blue-600 mt-1">
                        It must be accurate so you can be registered in the tournament app and notifications!
                      </p>
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., player@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-11"
                      />
                      <p className="text-xs text-blue-600 mt-1">
                        We'll send tournament updates and confirmation to this email address.
                      </p>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Academy/Club */}
                <div className="space-y-2">
                  <Label htmlFor="academyClub" className="text-sm font-medium text-gray-700">
                    Which Academy/Club you played last season *
                  </Label>
                  <Input
                    id="academyClub"
                    placeholder="Enter the name of your previous academy or club"
                    value={formData.academyClub}
                    onChange={(e) => handleInputChange("academyClub", e.target.value)}
                    className="h-11"
                  />
                  {errors.academyClub && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.academyClub}
                    </p>
                  )}
                </div>

                {/* Preferred Locations */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    Preferred Training Location *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableLocations.map((location) => (
                      <div key={location.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          id={location.id}
                          name="preferredLocation"
                          value={location.id}
                          checked={formData.preferredLocations.includes(location.id)}
                          onChange={() => handleLocationChange(location.id)}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={location.id}
                            className="text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {location.name}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            {location.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.preferredLocations && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.preferredLocations}
                    </p>
                  )}
                </div>

                {/* Trial Date Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    Preferred Trial Date (Optional)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trialDates.map((trialDate) => (
                      <div key={trialDate.date} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          id={trialDate.date}
                          name="trialDate"
                          value={trialDate.date}
                          checked={formData.trialDate === trialDate.date}
                          onChange={(e) => handleInputChange("trialDate", e.target.value)}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={trialDate.date}
                            className="text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {trialDate.label}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            {trialDate.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      💡 <strong>Not sure?</strong> If you don't select a date, we'll randomly assign you to either Tuesday (26th), Wednesday (27th), or Thursday (28th) August.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-6 py-2.5"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
