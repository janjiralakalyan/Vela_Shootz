import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPackages } from '../data/storage';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [packages, setPackages] = useState(getPackages());
  const [selectedCategory, setSelectedCategory] = useState('on-spot');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appliedPromotion, setAppliedPromotion] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'Event Reels',
    location: '',
    duration: '',
    peopleCount: '',
    instagram: '',
    requirements: ''
  });
  const [references, setReferences] = useState({
    moodboardUrl: '',
    referenceReelUrl: '',
    notes: ''
  });

  // Modal control for custom package enquiry
  const [customEnquiryModalOpen, setCustomEnquiryModalOpen] = useState(false);
  const [customEnquiryType, setCustomEnquiryType] = useState('Family Events');

  const refreshPackages = () => {
    setPackages(getPackages());
  };

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedCategory(pkg.category);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const applyPromotion = (promo) => {
    setAppliedPromotion(promo);
    if (promo.targetPackageId) {
      const targetPkg = packages.find(p => p.id === promo.targetPackageId);
      if (targetPkg) {
        setSelectedPackage(targetPkg);
        setSelectedCategory(targetPkg.category);
      }
    }
  };

  const calculateTotal = () => {
    if (!selectedPackage || selectedPackage.isCustom) return 0;
    let total = selectedPackage.price;
    selectedAddons.forEach(a => {
      total += a.price;
    });
    if (appliedPromotion && appliedPromotion.targetPackageId === selectedPackage.id) {
      if (appliedPromotion.originalPrice && appliedPromotion.finalPrice) {
        const discount = appliedPromotion.originalPrice - appliedPromotion.finalPrice;
        total = Math.max(0, total - discount);
      }
    }
    return total;
  };

  const openCustomEnquiry = (type = 'Family Events') => {
    setCustomEnquiryType(type);
    setCustomEnquiryModalOpen(true);
  };

  const resetBooking = () => {
    setSelectedPackage(null);
    setSelectedAddons([]);
    setSelectedDate('');
    setSelectedTime('');
    setAppliedPromotion(null);
    setEventDetails({
      customerName: '',
      phone: '',
      email: '',
      eventType: 'Event Reels',
      location: '',
      duration: '',
      peopleCount: '',
      instagram: '',
      requirements: ''
    });
    setReferences({
      moodboardUrl: '',
      referenceReelUrl: '',
      notes: ''
    });
  };

  return (
    <BookingContext.Provider
      value={{
        packages,
        refreshPackages,
        selectedCategory,
        setSelectedCategory,
        selectedPackage,
        selectPackage,
        selectedAddons,
        toggleAddon,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        appliedPromotion,
        applyPromotion,
        eventDetails,
        setEventDetails,
        references,
        setReferences,
        calculateTotal,
        resetBooking,
        customEnquiryModalOpen,
        setCustomEnquiryModalOpen,
        customEnquiryType,
        openCustomEnquiry
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
