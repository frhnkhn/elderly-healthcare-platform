// Mock API layer — simulates backend responses with short delays

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Mock Data ─────────────────────────────────────────────────────────────

export const SERVICES_DATA = [
  { id: 1, name: 'Nursing Care', description: 'Professional nursing services including wound care, medication management, and health monitoring by certified nurses.', icon: '🩺', duration: '4–8 hrs/day', price: 850, category: 'nursing', rating: 4.9, reviews: 124 },
  { id: 2, name: 'Elderly Attendant', description: 'Compassionate day-to-day assistance for elderly patients including bathing, grooming, and companionship.', icon: '❤️', duration: '8–12 hrs/day', price: 550, category: 'attendant', rating: 4.7, reviews: 98 },
  { id: 3, name: 'Physiotherapy', description: 'Targeted physical therapy sessions to improve mobility, reduce pain, and speed up recovery after surgery or injury.', icon: '🏃', duration: '1–2 hrs/session', price: 1200, category: 'physio', rating: 4.8, reviews: 67 },
  { id: 4, name: 'Post Hospital Care', description: 'Specialised care and monitoring for patients transitioning from hospital to home, ensuring a safe recovery environment.', icon: '🏥', duration: 'Full Day', price: 1500, category: 'post-hospital', rating: 4.9, reviews: 45 },
  { id: 5, name: 'Dementia Care', description: "Skilled carers trained in dementia and Alzheimer's support, providing structured routines and cognitive stimulation.", icon: '🧠', duration: '8–12 hrs/day', price: 950, category: 'specialised', rating: 4.6, reviews: 32 },
  { id: 6, name: 'Palliative Care', description: 'Compassionate end-of-life care focused on comfort, dignity, and quality of life for patients and their families.', icon: '🕊️', duration: 'Full Day', price: 1800, category: 'specialised', rating: 5.0, reviews: 19 },
];

export const CAREGIVERS_DATA = [
  { id: 1, name: 'Sarah Johnson', qualification: 'Registered Nurse (RN)', experience: '5 years', location: 'New York, NY', rating: 4.9, reviews: 48, availability: 'Available', services: ['Nursing Care', 'Post Hospital Care'], price: 900, bio: 'Dedicated RN with extensive experience in elderly care and post-surgical recovery. Passionate about holistic patient wellbeing.', photo: null, languages: ['English', 'Spanish'], verified: true },
  { id: 2, name: 'Michael Chen', qualification: 'Physiotherapist (MPT)', experience: '7 years', location: 'Los Angeles, CA', rating: 4.8, reviews: 62, availability: 'Available', services: ['Physiotherapy'], price: 1200, bio: 'Expert physiotherapist specialising in geriatric rehabilitation, sports injuries, and post-stroke recovery programs.', photo: null, languages: ['English', 'Mandarin'], verified: true },
  { id: 3, name: 'Emily Rodriguez', qualification: 'Certified Nursing Assistant (CNA)', experience: '3 years', location: 'Chicago, IL', rating: 4.7, reviews: 35, availability: 'Available', services: ['Elderly Attendant', 'Dementia Care'], price: 600, bio: 'Gentle and patient CNA with specialist training in dementia care and daily living assistance for the elderly.', photo: null, languages: ['English', 'Spanish'], verified: true },
  { id: 4, name: 'David Kim', qualification: 'Licensed Practical Nurse (LPN)', experience: '4 years', location: 'Houston, TX', rating: 4.6, reviews: 29, availability: 'Busy', services: ['Nursing Care', 'Palliative Care'], price: 850, bio: 'Compassionate LPN with expertise in chronic disease management and end-of-life care support.', photo: null, languages: ['English', 'Korean'], verified: true },
  { id: 5, name: 'Priya Sharma', qualification: 'Home Health Aide (HHA)', experience: '6 years', location: 'Phoenix, AZ', rating: 4.9, reviews: 71, availability: 'Available', services: ['Elderly Attendant', 'Post Hospital Care'], price: 650, bio: 'Warm and reliable HHA with six years of experience providing home-based care for elderly and post-hospitalised patients.', photo: null, languages: ['English', 'Hindi'], verified: true },
  { id: 6, name: 'James Wilson', qualification: 'Registered Nurse (RN)', experience: '9 years', location: 'Philadelphia, PA', rating: 4.8, reviews: 84, availability: 'Available', services: ['Nursing Care', 'Post Hospital Care', 'Palliative Care'], price: 1100, bio: 'Seasoned RN with extensive ICU and palliative care background. Committed to patient dignity and family support.', photo: null, languages: ['English'], verified: true },
];

export const BOOKINGS_DATA = [
  { id: 'BK001', service: 'Nursing Care', caregiver: 'Sarah Johnson', date: '2026-04-05', time: '09:00 AM', duration: '8 hours', address: '123 Main St, New York, NY', status: 'accepted', notes: 'Patient requires insulin monitoring.', patient: 'Robert Smith', amount: 900 },
  { id: 'BK002', service: 'Physiotherapy', caregiver: 'Michael Chen', date: '2026-04-08', time: '11:00 AM', duration: '2 hours', address: '123 Main St, New York, NY', status: 'pending', notes: 'Post-knee surgery rehabilitation.', patient: 'Robert Smith', amount: 1200 },
  { id: 'BK003', service: 'Elderly Attendant', caregiver: 'Priya Sharma', date: '2026-03-28', time: '08:00 AM', duration: '10 hours', address: '123 Main St, New York, NY', status: 'completed', notes: '', patient: 'Eleanor Smith', amount: 650 },
  { id: 'BK004', service: 'Nursing Care', caregiver: 'James Wilson', date: '2026-03-20', time: '10:00 AM', duration: '8 hours', address: '123 Main St, New York, NY', status: 'completed', notes: 'Post-surgery wound care.', patient: 'Robert Smith', amount: 1100 },
];

export const PATIENTS_DATA = [
  { id: 1, name: 'Robert Smith', age: 72, gender: 'Male', condition: 'Diabetes, Hypertension', careType: 'Nursing Care', address: '123 Main St, New York, NY', emergencyContact: 'Jane Smith (Daughter) - 555-0202', notes: 'Requires daily insulin monitoring and low-sodium diet.' },
  { id: 2, name: 'Eleanor Smith', age: 68, gender: 'Female', condition: 'Mild Dementia', careType: 'Elderly Attendant', address: '123 Main St, New York, NY', emergencyContact: 'John Smith (Son) - 555-0101', notes: 'Enjoys gardening. Needs structured daily routine.' },
];

export const CAREGIVER_REQUESTS_DATA = [
  { id: 'BK005', service: 'Nursing Care', patient: 'Alice Brown', date: '2026-04-06', time: '09:00 AM', duration: '6 hours', address: '456 Oak Ave, Brooklyn, NY', status: 'pending', notes: 'Post-surgery care needed.', amount: 900 },
  { id: 'BK006', service: 'Post Hospital Care', patient: 'George Harris', date: '2026-04-07', time: '08:00 AM', duration: '10 hours', address: '789 Pine Rd, Queens, NY', status: 'pending', notes: 'Requires IV medication management.', amount: 1500 },
];

export const EARNINGS_DATA = [
  { month: 'January', amount: 8400, bookings: 12 },
  { month: 'February', amount: 7200, bookings: 10 },
  { month: 'March', amount: 9600, bookings: 14 },
];

export const ADMIN_STATS = {
  totalUsers: 1248,
  totalCaregivers: 347,
  totalBookings: 3892,
  activeBookings: 124,
  revenue: 284500,
  pendingVerifications: 23,
  complaints: 8,
};

// ─── API Functions ──────────────────────────────────────────────────────────

export const api = {
  async getServices(filters = {}) {
    await delay();
    let data = [...SERVICES_DATA];
    if (filters.category) data = data.filter(s => s.category === filters.category);
    if (filters.search) data = data.filter(s => s.name.toLowerCase().includes(filters.search.toLowerCase()));
    return { data, success: true };
  },

  async getCaregivers(filters = {}) {
    await delay();
    let data = [...CAREGIVERS_DATA];
    if (filters.service) data = data.filter(c => c.services.some(s => s.toLowerCase().includes(filters.service.toLowerCase())));
    if (filters.location) data = data.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.search) data = data.filter(c => c.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.availability) data = data.filter(c => c.availability === filters.availability);
    return { data, success: true };
  },

  async getCaregiverById(id) {
    await delay();
    const caregiver = CAREGIVERS_DATA.find(c => c.id === parseInt(id));
    if (!caregiver) return { data: null, success: false, message: 'Caregiver not found' };
    return { data: caregiver, success: true };
  },

  async getBookings(userId) {
    await delay();
    return { data: BOOKINGS_DATA, success: true };
  },

  async postBooking(bookingData) {
    await delay(600);
    const newBooking = {
      id: `BK${String(Date.now()).slice(-4)}`,
      ...bookingData,
      status: 'pending',
    };
    return { data: newBooking, success: true, message: 'Booking confirmed successfully!' };
  },

  async postLogin(email, password, role) {
    await delay();
    return { success: true };
  },

  async postRegister(userData) {
    await delay(800);
    return { success: true, message: 'Registration successful!' };
  },

  async getPatients() {
    await delay();
    return { data: PATIENTS_DATA, success: true };
  },

  async savePatient(patientData) {
    await delay(500);
    return { data: { id: Date.now(), ...patientData }, success: true, message: 'Patient profile saved!' };
  },

  async getCaregiverRequests() {
    await delay();
    return { data: CAREGIVER_REQUESTS_DATA, success: true };
  },

  async updateBookingStatus(id, status) {
    await delay(300);
    return { success: true, message: `Booking ${status}!` };
  },

  async getEarnings() {
    await delay();
    return { data: EARNINGS_DATA, success: true };
  },

  async getAdminStats() {
    await delay();
    return { data: ADMIN_STATS, success: true };
  },

  async getAllUsers() {
    await delay();
    return {
      data: [
        { id: 1, name: 'John Smith', email: 'user@demo.com', role: 'user', joined: '2025-09-12', bookings: 8, status: 'active' },
        { id: 2, name: 'Mary Johnson', email: 'mary@example.com', role: 'user', joined: '2025-11-03', bookings: 3, status: 'active' },
        { id: 3, name: 'Robert Davis', email: 'rob@example.com', role: 'user', joined: '2026-01-20', bookings: 1, status: 'inactive' },
        { id: 4, name: 'Linda White', email: 'linda@example.com', role: 'user', joined: '2026-02-14', bookings: 5, status: 'active' },
      ],
      success: true,
    };
  },

  async getAllCaregivers() {
    await delay();
    return {
      data: CAREGIVERS_DATA.map(c => ({ ...c, status: 'verified', joined: '2025-08-01' })),
      success: true,
    };
  },

  async getAllBookings() {
    await delay();
    return {
      data: [
        ...BOOKINGS_DATA,
        { id: 'BK005', service: 'Physiotherapy', caregiver: 'Michael Chen', date: '2026-04-09', time: '02:00 PM', duration: '1.5 hours', address: '456 Oak Ave', status: 'pending', patient: 'Alice Brown', amount: 1200 },
        { id: 'BK006', service: 'Elderly Attendant', caregiver: 'Emily Rodriguez', date: '2026-04-10', time: '08:00 AM', duration: '10 hours', address: '789 Pine St', status: 'accepted', patient: 'George Harris', amount: 600 },
      ],
      success: true,
    };
  },
};

export default api;
