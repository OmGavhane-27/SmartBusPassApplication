export const simulatedUsers = [
  {
    id: 'user1',
    username: 'student',
    password: 'password',
    role: 'user',
    email: 'student@example.com',
    phone: '1234567890',
    address: '123 Main St, Pune',
    gender: 'Male'
  },
  {
    id: 'admin1',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    email: 'admin@example.com',
    phone: '0987654321',
    address: '456 Admin Rd, Pune',
    gender: 'Female'
  }
];

export const simulatedPasses = [
  {
    id: 'pass1',
    userId: 'user1',
    type: 'Student',
    status: 'Approved',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    qrCodeData: 'BUSPASS-USER1-2024-12-31',
    source: 'Shivajinagar',
    destination: 'University Campus',
    fare: 500,
    durationMonths: 12,
    durationType: '12_months'
  },
  {
    id: 'pass2',
    userId: 'user1',
    type: 'Commuter',
    status: 'Expired',
    startDate: '2023-05-01',
    endDate: '2023-11-01',
    qrCodeData: 'BUSPASS-USER1-2023-11-01',
    source: 'City Center',
    destination: 'Tech Park',
    fare: 300,
    durationMonths: 6,
    durationType: '6_months'
  },
  {
    id: 'pass3',
    userId: 'user1',
    type: 'Commuter',
    status: 'Approved',
    startDate: '2024-07-01',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    qrCodeData: 'BUSPASS-USER1-EXPIRING-SOON',
    source: 'Kothrud',
    destination: 'Deccan Gymkhana',
    fare: 100,
    durationMonths: 1,
    durationType: '1_month'
  },
  {
    id: 'pass4',
    userId: 'user1',
    type: 'Daily',
    status: 'Approved',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
    qrCodeData: 'BUSPASS-USER1-DAILY-2024-07-28',
    source: 'Kothrud',
    destination: 'Deccan Gymkhana',
    fare: 50,
    durationMonths: 0,
    durationType: 'daily'
  }
];

export const simulatedWallets = {
  user1: 1000,  // Example balance for user1
  admin1: 0     // Admin doesn't need a wallet
};
