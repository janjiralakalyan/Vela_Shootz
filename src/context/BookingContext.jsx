import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPackages, getBookedSlotsForDate, subscribeToSlotChanges } from '../data/storage';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [packages, setPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
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

  // Realtime slot availability state
  const [bookedSlotsForDate, setBookedSlotsForDate] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Modal control for custom package enquiry
  const [customEnquiryModalOpen, setCustomEnquiryModalOpen] = useState(false);
  const [customEnquiryType, setCustomEnquiryType] = useState('Family Events');

  // Load packages from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    setPackagesLoading(true);
    getPackages().then(pkgs => {
      if (isMounted) {
        setPackages(pkgs);
        setPackagesLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch booked slots whenever date changes
  const refreshSlotsForDate = useCallback(async (dateStr) => {
    if (!dateStr) {
      setBookedSlotsForDate([]);
      return;
    }
    setSlotsLoading(true);
    const booked = await getBookedSlotsForDate(dateStr);
    setBookedSlotsForDate(booked);
    setSlotsLoading(false);
  }, []);

  useEffect(() => {
    refreshSlotsForDate(selectedDate);
  }, [selectedDate, refreshSlotsForDate]);

  // Realtime subscription — refresh slot availability on any booking/blocked_slot change
  useEffect(() => {
    const unsubscribe = subscribeToSlotChanges(() => {
      if (selectedDate) {
        refreshSlotsForDate(selectedDate);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [selectedDate, refreshSlotsForDate]);

  const refreshPackages = async () => {
    const pkgs = await getPackages();
    setPackages(pkgs);
  };

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    if (pkg) setSelectedCategory(pkg.category);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) return prev.filter(a => a.id !== addon.id);
      return [...prev, addon];
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
    selectedAddons.forEach(a => { total += a.price; });
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
    setBookedSlotsForDate([]);
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
        packagesLoading,
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
        openCustomEnquiry,
        // Slot availability
        bookedSlotsForDate,
        slotsLoading,
        refreshSlotsForDate
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
