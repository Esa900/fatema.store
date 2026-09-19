import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, Save, Key, Lock, Eye, EyeOff, ShieldCheck, 
  Store, Phone, Mail, MapPin, Bell, Download, Upload, 
  CheckCircle2, AlertCircle, RefreshCw, RefreshCcw, Truck, Globe,
  MessageSquare, Send, Smartphone, History, Trash2
} from 'lucide-react';
import { StoreSettings, SMSLog } from '../../../types';
import { StoreService } from '../../../services/store';

interface StoreControlsTabProps {
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
  onRefreshData: () => void;
}

export const StoreControlsTab: React.FC<StoreControlsTabProps> = ({
  settings,
  onSaveSettings,
  onRefreshData
}) => {
  // Local Form state for Settings
  const [storeName, setStoreName] = useState(settings.storeName || 'KHAN store');
  const [tagline, setTagline] = useState(settings.tagline || settings.brandTagline || '১০০% খাঁটি ও নিরাপদ অর্গানিক ফুড');
  const [phone, setPhone] = useState(settings.phone || settings.hotline || '01854774406');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '01854774406');
  const [email, setEmail] = useState(settings.email || settings.supportEmail || 'contact@khanstore.com');
  const [address, setAddress] = useState(settings.address || settings.officeAddress || 'House 14, Road 4, Sector 7, Uttara, Dhaka 1230, Bangladesh');
  
  // Announcement
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(settings.isAnnouncementActive !== false);
  const [announcementText, setAnnouncementText] = useState(
    settings.announcementText || '🌿 KHAN store স্পেশাল অফার: খাঁটি মধু ও ঘি অর্ডারে আকর্ষণীয় ছাড় | সারাদেশে ক্যাশ অন ডেলিভারি'
  );

  // Delivery Charges
  const [deliveryChargeDhaka, setDeliveryChargeDhaka] = useState(settings.deliveryChargeDhaka ?? 60);
  const [deliveryChargeOutside, setDeliveryChargeOutside] = useState(settings.deliveryChargeOutside ?? 120);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold ?? 2000);

  // About Us
  const [aboutUsText, setAboutUsText] = useState(
    settings.aboutUsText || 'KHAN store বাংলাদেশের অন্যতম নির্ভরযোগ্য অথেন্টিক অর্গানিক ফুড ও স্বাস্থ্যকর খাদ্যপণ্য সরবরাহকারী প্রতিষ্ঠান।'
  );

  // SMS Gateway Settings
  const [smsEnabled, setSmsEnabled] = useState(settings.smsEnabled !== false);
  const [smsSenderId, setSmsSenderId] = useState(settings.smsSenderId || 'KHAN store');
  const [smsProvider, setSmsProvider] = useState(settings.smsProvider || 'Greenweb BD');
  const [smsApiKey, setSmsApiKey] = useState(settings.smsApiKey || 'GW-LIVE-KEY-991');
  const [smsTemplate, setSmsTemplate] = useState(
    settings.smsTemplate || 'প্রিয় [NAME], KHAN store-এ আপনার অর্ডার [ORDER_ID] সফলভাবে গ্রহণ করা হয়েছে! সর্বমোট: ৳[TOTAL]। হেল্পলাইন: 01854774406'
  );
  const [smsTrackingTemplate, setSmsTrackingTemplate] = useState(
    settings.smsTrackingTemplate || 'প্রিয় [NAME], KHAN store থেকে আপনার অর্ডার [ORDER_ID] কুরিয়ারে ([COURIER]) হ্যান্ডওভার করা হয়েছে। ট্র্যাকিং কোড: [TRACKING_ID]। হেল্পলাইন: 01854774406'
  );
  const [smsLogs, setSmsLogs] = useState<SMSLog[]>(() => StoreService.getSMSLogs());
  const [testPhone, setTestPhone] = useState('01854774406');
  const [testResult, setTestResult] = useState('');

  // Re-sync local states whenever settings prop changes (e.g. from storage or other tabs)
  useEffect(() => {
    setStoreName(settings.storeName || 'KHAN store');
    setTagline(settings.tagline || settings.brandTagline || '১০০% খাঁটি ও নিরাপদ অর্গানিক ফুড');
    setPhone(settings.phone || settings.hotline || '01854774406');
    setWhatsappNumber(settings.whatsappNumber || '01854774406');
    setEmail(settings.email || settings.supportEmail || 'contact@khanstore.com');
    setAddress(settings.address || settings.officeAddress || 'House 14, Road 4, Sector 7, Uttara, Dhaka 1230, Bangladesh');
    setIsAnnouncementActive(settings.isAnnouncementActive !== false);
    setAnnouncementText(settings.announcementText || '🌿 KHAN store স্পেশাল অফার: খাঁটি মধু ও ঘি অর্ডারে আকর্ষণীয় ছাড় | সারাদেশে ক্যাশ অন ডেলিভারি');
    setDeliveryChargeDhaka(settings.deliveryChargeDhaka ?? 60);
    setDeliveryChargeOutside(settings.deliveryChargeOutside ?? 120);
    setFreeDeliveryThreshold(settings.freeDeliveryThreshold ?? 2000);
    setAboutUsText(settings.aboutUsText || 'KHAN store বাংলাদেশের অন্যতম নির্ভরযোগ্য অথেন্টিক অর্গানিক ফুড ও স্বাস্থ্যকর খাদ্যপণ্য সরবরাহকারী প্রতিষ্ঠান।');
    setSmsEnabled(settings.smsEnabled !== false);
    setSmsSenderId(settings.smsSenderId || 'KHAN store');
    setSmsProvider(settings.smsProvider || 'Greenweb BD');
    setSmsApiKey(settings.smsApiKey || 'GW-LIVE-KEY-991');
    setSmsTemplate(settings.smsTemplate || 'প্রিয় [NAME], KHAN store-এ আপনার অর্ডার [ORDER_ID] সফলভাবে গ্রহণ করা হয়েছে! সর্বমোট: ৳[TOTAL]। হেল্পলাইন: 01854774406');
    setSmsTrackingTemplate(settings.smsTrackingTemplate || 'প্রিয় [NAME], KHAN store থেকে আপনার অর্ডার [ORDER_ID] কুরিয়ারে ([COURIER]) হ্যান্ডওভার করা হয়েছে। ট্র্যাকিং কোড: [TRACKING_ID]। হেল্পলাইন: 01854774406');
    setSmsLogs(StoreService.getSMSLogs());
  }, [settings]);

  // Feedback Banner
  const [savedSuccessMessage, setSavedSuccessMessage] = useState('');

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Backup file input ref
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Save General Settings
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreSettings = {
      ...settings,
      storeName: storeName.trim(),
      brandTagline: tagline.trim(),
      tagline: tagline.trim(),
      hotline: phone.trim(),
      phone: phone.trim(),
      whatsappNumber: whatsappNumber.trim(),
      supportEmail: email.trim(),
      email: email.trim(),
      officeAddress: address.trim(),
      address: address.trim(),
      isAnnouncementActive,
      announcementText: announcementText.trim(),
      deliveryChargeDhaka: Number(deliveryChargeDhaka),
      deliveryChargeOutside: Number(deliveryChargeOutside),
      freeDeliveryThreshold: Number(freeDeliveryThreshold),
      aboutUsText: aboutUsText.trim(),
      smsEnabled,
      smsSenderId: smsSenderId.trim(),
      smsProvider: smsProvider.trim(),
      smsApiKey: smsApiKey.trim(),
      smsTemplate: smsTemplate.trim(),
      smsTrackingTemplate: smsTrackingTemplate.trim(),
    };

    onSaveSettings(updated);
    setSavedSuccessMessage('স্টোর সেটিংস ও এসএমএস কনফিগারেশন সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setSavedSuccessMessage(''), 4500);
  };

  // Send Test SMS
  const handleSendTestSMS = () => {
    if (!testPhone.trim()) {
      setTestResult('অনুগ্রহ করে সঠিক মোবাইল নম্বর লিখুন');
      return;
    }
    const res = StoreService.sendTestSMS(testPhone.trim());
    setSmsLogs(StoreService.getSMSLogs());
    setTestResult(`টেস্ট SMS সফলভাবে প্রেরিত হয়েছে: "${res.message.slice(0, 45)}..."`);
    setTimeout(() => setTestResult(''), 5000);
  };

  // Clear SMS logs
  const handleClearSMSLogs = () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সকল SMS হিস্ট্রি মুছে ফেলতে চান?')) {
      StoreService.clearSMSLogs();
      setSmsLogs([]);
    }
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const actualCurrent = StoreService.getAdminPassword();
    if (currentPassword !== actualCurrent) {
      setPasswordError('বর্তমান পাসওয়ার্ড সঠিক নয়!');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!');
      return;
    }

    StoreService.setAdminPassword(newPassword);
    const updatedWithPass = {
      ...StoreService.getSettings(),
      adminPassword: newPassword
    };
    onSaveSettings(updatedWithPass);
    setPasswordSuccess('অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে ও ক্লাউডে সিঙ্ক হয়েছে! সকল ডিভাইসে পরবর্তী লগইনে এটি ব্যবহার করুন।');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const jsonStr = StoreService.exportStoreSnapshot();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KHAN-GADGET-BD-Store-Backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = StoreService.importStoreSnapshot(content);
        if (success) {
          alert('ব্যাকআপ ডাটা সফলভাবে রিস্টোর হয়েছে! পেজটি রিফ্রেশ হচ্ছে...');
          onRefreshData();
          window.location.reload();
        } else {
          alert('ব্যাকআপ ফাইলটি অকার্যকর বা ফরম্যাট সঠিক নয়!');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      {/* Header with Cloud Sync Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            <span>স্টোর কন্ট্রোল ও সিকিউরিটি সেটিংস (Store Controls & Security)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            যোগাযোগের তথ্য, নোটিশ বার, ডেলিভারি চার্জ, পাসওয়ার্ড ও ডাটা ব্যাকআপ
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ক্লাউড সিঙ্ক সক্রিয় (Live Cloud Synced)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onRefreshData();
              setSavedSuccessMessage('ক্লাউড ডাটা সফলভাবে রিফ্রেশ ও সিঙ্ক করা হয়েছে!');
              setTimeout(() => setSavedSuccessMessage(''), 3000);
            }}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
            title="ক্লাউড থেকে ডাটা রিফ্রেশ করুন"
          >
            <RefreshCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>রিফ্রেশ ডাটা</span>
          </button>
        </div>
      </div>

      {savedSuccessMessage && (
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-2xl text-xs font-bold text-orange-950 flex items-center justify-between gap-3 animate-in fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#f85606] shrink-0" />
            <span>{savedSuccessMessage}</span>
          </div>
          <span className="text-[11px] bg-[#f85606] text-white px-2.5 py-1 rounded-lg font-bold shrink-0">
            লাইভ কার্যকর
          </span>
        </div>
      )}

      {/* 1. Store Profile & Announcement Form */}
      <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
        {/* Top Announcement Bar Control */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>টপ অ্যানাউন্সমেন্ট নোটিশ বার (Top Announcement Bar)</span>
              </h3>
              <p className="text-xs text-slate-500">
                ওয়েবসাইটের সবচেয়ে উপরে দারাজ-স্টাইলে বিশেষ অফার বা জরুরি বিজ্ঞপ্তি প্রদর্শন করুন
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-bold text-slate-700">নোটিশ সক্রিয়:</span>
              <input
                type="checkbox"
                checked={isAnnouncementActive}
                onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              বিজ্ঞপ্তি টেক্সট (Notice Message)
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="🚚 ঢাকা শহরে ২ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি!..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Live Preview */}
          <div className="bg-slate-900 text-amber-300 p-2.5 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800">
            <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded uppercase">
              লাইভ প্রিভিউ
            </span>
            <span className="truncate">{announcementText || 'কোনো নোটিশ নেই'}</span>
          </div>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>স্টোর পরিচিতি ও সাপোর্ট কন্ট্রোল (Store Information)</span>
            </h3>
            <p className="text-xs text-slate-500">
              ওয়েবসাইটের হেডার, ফুটার ও ইনভয়েসে এই তথ্য স্বয়ংক্রিয়ভাবে ব্যবহৃত হবে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">স্টোরের নাম (Brand Name)</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ট্যাগলাইন (Slogan)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">কাস্টমার কেয়ার হটলাইন</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01700-373741"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">সাপোর্ট হোয়াটসঅ্যাপ নাম্বার</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="01700-373741"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ইমেইল</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অফিস ও ওয়্যারহাউস ঠিকানা</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">আমাদের সম্পর্কে (About Us Text)</label>
            <textarea
              rows={2}
              value={aboutUsText}
              onChange={(e) => setAboutUsText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:border-emerald-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Delivery Charges Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>ডেলিভারি চার্জ নির্ধারণ (Delivery Rates)</span>
            </h3>
            <p className="text-xs text-slate-500">
              চেকআউটে গ্রাহকের এলাকা অনুযায়ী চার্জ স্বয়ংক্রিয়ভাবে যুক্ত হবে
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকা সিটি ডেলিভারি (৳)</label>
              <input
                type="number"
                min="0"
                value={deliveryChargeDhaka}
                onChange={(e) => setDeliveryChargeDhaka(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-black text-slate-900 bg-white"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">ঢাকার বাহিরে ডেলিভারি (৳)</label>
              <input
                type="number"
                min="0"
                value={deliveryChargeOutside}
                onChange={(e) => setDeliveryChargeOutside(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-black text-slate-900 bg-white"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">ফ্রি ডেলিভারি থ্রেশহোল্ড (৳)</label>
              <input
                type="number"
                min="0"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-black text-emerald-700 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">এই পরিমাণের বেশি অর্ডারে চার্জ ফ্রি</span>
            </div>
          </div>
        </div>

        {/* SMS Gateway & Automation Settings Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>স্বয়ংক্রিয় এসএমএস নোটিফিকেশন সিস্টেম (SMS Notification Engine)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                নতুন অর্ডার আসলে এবং কুরিয়ারে বুকিং দিলে গ্রাহকের মোবাইলে ইনস্ট্যান্ট কনফার্মেশন ও ট্র্যাকিং SMS যাবে
              </p>
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-md focus:ring-0 cursor-pointer"
              />
              <span className={`text-xs font-bold ${smsEnabled ? 'text-emerald-700' : 'text-slate-500'}`}>
                {smsEnabled ? 'SMS সার্ভিস সক্রিয় (Active)' : 'SMS সার্ভিস নিষ্ক্রিয় (Disabled)'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* SMS Provider */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                এসএমএস গেটওয়ে প্রোভাইডার (SMS Gateway)
              </label>
              <select
                value={smsProvider}
                onChange={(e) => setSmsProvider(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:border-emerald-600 focus:outline-hidden"
              >
                <option value="Greenweb BD">Greenweb BD (গ্রিনওয়েব)</option>
                <option value="BulkSMS BD">BulkSMS BD (বাল্ক এসএমএস)</option>
                <option value="ElitBuzz">ElitBuzz BD (এলিটবাজ)</option>
                <option value="Alpha SMS">Alpha SMS (আলফা নেট)</option>
                <option value="Twilio">Twilio Global</option>
                <option value="Store Auto Dispatch">Auto Direct (সরাসরি সিম/ক্লাউড গেটওয়ে)</option>
              </select>
            </div>

            {/* Sender ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                সেন্ডার আইডি / মাস্কিং নাম (Sender ID / Masking)
              </label>
              <input
                type="text"
                value={smsSenderId}
                onChange={(e) => setSmsSenderId(e.target.value)}
                placeholder="KHAN store / 88096..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:border-emerald-600 focus:outline-hidden font-mono"
              />
            </div>

            {/* API Key */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                গেটওয়ে সিক্রেট এপিআই কি (API Secret Key)
              </label>
              <input
                type="password"
                value={smsApiKey}
                onChange={(e) => setSmsApiKey(e.target.value)}
                placeholder="e.g. gw_live_sec_key_xxx"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* SMS Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {/* Template 1: Order Confirmation */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>১. অর্ডার কনফার্মেশন এসএমএস টেমপ্লেট</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {smsTemplate.length} অক্ষর ({Math.ceil(smsTemplate.length / 160) || 1} SMS)
                </span>
              </div>
              <textarea
                rows={3}
                value={smsTemplate}
                onChange={(e) => setSmsTemplate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-emerald-600 focus:outline-hidden leading-relaxed resize-none"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-500">
                <span className="font-bold">ভ্যারিয়েবলসমূহ:</span>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[NAME]</code>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[ORDER_ID]</code>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[TOTAL]</code>
              </div>
            </div>

            {/* Template 2: Courier Tracking */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>২. কুরিয়ার ট্র্যাকিং এসএমএস টেমপ্লেট</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {smsTrackingTemplate.length} অক্ষর ({Math.ceil(smsTrackingTemplate.length / 160) || 1} SMS)
                </span>
              </div>
              <textarea
                rows={3}
                value={smsTrackingTemplate}
                onChange={(e) => setSmsTrackingTemplate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-emerald-600 focus:outline-hidden leading-relaxed resize-none"
              />
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-500">
                <span className="font-bold">ভ্যারিয়েবলসমূহ:</span>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[NAME]</code>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[ORDER_ID]</code>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[COURIER]</code>
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700 font-mono">[TRACKING_ID]</code>
              </div>
            </div>
          </div>

          {/* Test SMS Sending tool */}
          <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-indigo-950">লাইভ টেস্ট SMS ভেরিফিকেশন</span>
                <p className="text-[11px] text-indigo-700">একটি টেস্ট মোবাইল নম্বর দিয়ে তাৎক্ষণিক SMS ডেলিভারি পরীক্ষা করুন</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="tel"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="01854774406"
                className="px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-slate-800 w-36 font-mono focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleSendTestSMS}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-2xs shrink-0 cursor-pointer transition-colors"
              >
                টেস্ট SMS পাঠান
              </button>
            </div>
          </div>
          {testResult && (
            <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}

          {/* SMS Dispatch History Table */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-600" />
                <span>সাম্প্রতিক প্রেরিত এসএমএস হিস্ট্রি (Live SMS Sent Logs: {smsLogs.length})</span>
              </span>
              {smsLogs.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSMSLogs}
                  className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>লগ মুছুন</span>
                </button>
              )}
            </div>

            {smsLogs.length === 0 ? (
              <div className="text-center py-5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                এখনও কোনো এসএমএস প্রেরণ করা হয়নি। নতুন অর্ডার প্লেস হলে বা কুরিয়ারে অ্যাসাইন করলে এখানে হিস্ট্রি দেখতে পাবেন।
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                    <tr>
                      <th className="p-2.5">সময়</th>
                      <th className="p-2.5">অর্ডার / গ্রাহক</th>
                      <th className="p-2.5">মোবাইল</th>
                      <th className="p-2.5">মেসেজ কনটেন্ট</th>
                      <th className="p-2.5 text-right">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {smsLogs.slice(0, 10).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {new Date(log.sentAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                          #{log.orderNumber}
                        </td>
                        <td className="p-2.5 font-mono text-slate-700 whitespace-nowrap">
                          {log.recipientPhone}
                        </td>
                        <td className="p-2.5 text-slate-600 max-w-xs truncate" title={log.message}>
                          {log.message}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                            {log.status === 'Delivered' ? 'ডেলিভার্ড' : log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Save General Settings Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#f85606] hover:bg-[#e04a00] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md active:scale-95 cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>স্টোর সেটিংস সংরক্ষণ করুন (Save Settings)</span>
          </button>
        </div>
      </form>

      {/* 2. Change Admin Password Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>অ্যাডমিন পাসওয়ার্ড পরিবর্তন (Change Admin Password)</span>
            </h3>
            <p className="text-xs text-slate-500">
              অ্যাডমিন প্যানেলের নিরাপত্তা নিশ্চিত করতে নিয়মিত শক্তিশালী পাসওয়ার্ড ব্যবহার করুন
            </p>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          {passwordError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">বর্তমান পাসওয়ার্ড (Current Password)</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="বর্তমান পাসওয়ার্ড দিন..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">নতুন পাসওয়ার্ড (New Password)</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড দিন..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">কনফার্ম পাসওয়ার্ড (Confirm)</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="নতুন পাসওয়ার্ড পুনরায় দিন..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>পাসওয়ার্ড আপডেট করুন</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Cloud Sync & Snapshot Backup/Restore */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>ডাটা ব্যাকআপ ও রিস্টোর (Cloud Sync & Snapshot Backup)</span>
          </h3>
          <p className="text-xs text-slate-500">
            পুরো ওয়েবসাইটের পণ্য, অর্ডার, ক্যাটাগরি, সেটিংস ও কুপন ডাটা ১-ক্লিকে ডাউনলোড ও রিস্টোর করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Download Backup */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>ফুল ডাটাবেজ ব্যাকআপ ডাউনলোড</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                সকল পণ্য, অর্ডার তালিকা এবং স্টোর সেটিংস একটি সুরক্ষিত JSON ফাইলে আপনার কম্পিউটারে ডাউনলোড হবে।
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportBackup}
              className="mt-3 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>এখনই ব্যাকআপ ফাইল ডাউনলোড করুন (JSON)</span>
            </button>
          </div>

          {/* Restore Backup */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>ব্যাকআপ ফাইল থেকে ডাটা রিস্টোর</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                পূর্বের ব্যাকআপকৃত JSON ফাইল আপলোড করে এক নিমেষেই পূর্বের সমস্ত তথ্য ফিরিয়ে আনুন।
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={backupInputRef}
                accept=".json"
                className="hidden"
                onChange={handleImportBackup}
              />
              <button
                type="button"
                onClick={() => backupInputRef.current?.click()}
                className="mt-3 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-98"
              >
                <Upload className="w-4 h-4" />
                <span>JSON ব্যাকআপ ফাইল সিলেক্ট করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
