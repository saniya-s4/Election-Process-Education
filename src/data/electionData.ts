export const STATES_DATA = [
  { id: 'ap', name: 'Andhra Pradesh', language: 'Telugu', helpline: '1950' },
  { id: 'ar', name: 'Arunachal Pradesh', language: 'English', helpline: '1950' },
  { id: 'as', name: 'Assam', language: 'Assamese', helpline: '1950' },
  { id: 'br', name: 'Bihar', language: 'Hindi', helpline: '1950' },
  { id: 'ct', name: 'Chhattisgarh', language: 'Hindi', helpline: '1950' },
  { id: 'ga', name: 'Goa', language: 'Konkani', helpline: '1950' },
  { id: 'gj', name: 'Gujarat', language: 'Gujarati', helpline: '1950' },
  { id: 'hr', name: 'Haryana', language: 'Hindi', helpline: '1950' },
  { id: 'hp', name: 'Himachal Pradesh', language: 'Hindi', helpline: '1950' },
  { id: 'jh', name: 'Jharkhand', language: 'Hindi', helpline: '1950' },
  { id: 'ka', name: 'Karnataka', language: 'Kannada', helpline: '1950' },
  { id: 'kl', name: 'Kerala', language: 'Malayalam', helpline: '1950' },
  { id: 'mp', name: 'Madhya Pradesh', language: 'Hindi', helpline: '1950' },
  { id: 'mh', name: 'Maharashtra', language: 'Marathi', helpline: '1950' },
  { id: 'mn', name: 'Manipur', language: 'Manipuri', helpline: '1950' },
  { id: 'ml', name: 'Meghalaya', language: 'English', helpline: '1950' },
  { id: 'mz', name: 'Mizoram', language: 'Mizo', helpline: '1950' },
  { id: 'nl', name: 'Nagaland', language: 'English', helpline: '1950' },
  { id: 'or', name: 'Odisha', language: 'Odia', helpline: '1950' },
  { id: 'pb', name: 'Punjab', language: 'Punjabi', helpline: '1950' },
  { id: 'rj', name: 'Rajasthan', language: 'Hindi', helpline: '1950' },
  { id: 'sk', name: 'Sikkim', language: 'Nepali', helpline: '1950' },
  { id: 'tn', name: 'Tamil Nadu', language: 'Tamil', helpline: '1950' },
  { id: 'tg', name: 'Telangana', language: 'Telugu', helpline: '1950' },
  { id: 'tr', name: 'Tripura', language: 'Bengali', helpline: '1950' },
  { id: 'up', name: 'Uttar Pradesh', language: 'Hindi', helpline: '1950' },
  { id: 'uk', name: 'Uttarakhand', language: 'Hindi', helpline: '1950' },
  { id: 'wb', name: 'West Bengal', language: 'Bengali', helpline: '1950' },
];

export const ELECTION_TIMELINE = [
  {
    title: 'Voter Registration',
    step: '1',
    description: 'Ensure your name is in the electoral roll. Use Form 6 for new registration.',
    longDesc: 'The first step is to check if you are registered. If not, you can apply online through the NVSP portal or the Voter Helpline App. You need a passport-sized photo, age proof, and address proof.'
  },
  {
    title: 'Nomination',
    step: '2',
    description: 'Candidates file their nominations and affidavits.',
    longDesc: 'Candidates must submit their nomination papers to the Returning Officer. They also file an affidavit (Form 26) disclosing their criminal records (if any), assets, liabilities, and educational qualifications.'
  },
  {
    title: 'Model Code of Conduct',
    step: '3',
    description: 'Special rules come into force to ensure fair play.',
    longDesc: 'The MCC is a set of guidelines issued by the ECI for political parties and candidates during elections, especially with respect to speeches, polling day, polling booths, election manifestos, processions, and general conduct.'
  },
  {
    title: 'Campaigning',
    step: '4',
    description: 'Parties and candidates appeal to voters for support.',
    longDesc: 'Campaigning stops 48 hours before the conclusion of the poll. This is called the "silence period".'
  },
  {
    title: 'Voting Day',
    step: '5',
    description: 'Voters head to polling booths to cast their vote via EVMs.',
    longDesc: 'On the polling day, voters go to their assigned polling stations. Identity is verified using the EPIC (Voter ID) or other approved identity documents. An indelible ink mark is applied to the left forefinger.'
  },
  {
    title: 'Counting & Results',
    step: '6',
    description: 'Votes are counted and winners declared.',
    longDesc: 'Counting of votes is done under the supervision of the Returning Officer. Result is declared immediately after counting is completed.'
  }
];

export const QUIZ_QUESTIONS = [
  {
    question: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    answer: "18"
  },
  {
    question: "Which body conducts elections in India?",
    options: ["Parliament", "Supreme Court", "Election Commission of India", "Planning Commission"],
    answer: "Election Commission of India"
  },
  {
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Electric Voter Method", "Every Vote Matters", "Election Voter Management"],
    answer: "Electronic Voting Machine"
  },
  {
    question: "How long is the term of a Lok Sabha member?",
    options: ["4 years", "5 years", "6 years", "No fixed term"],
    answer: "5 years"
  }
];

export const IMPORTANT_DATES = [
  {
    id: 'reg-deadline',
    title: 'Voter Registration Deadline',
    date: '2026-10-15',
    category: 'Registration',
    description: 'Last date to submit Form 6 for the upcoming general election cycle.'
  },
  {
    id: 'nom-start',
    title: 'Nomination Process Begins',
    date: '2026-11-01',
    category: 'Election',
    description: 'Candidates can start filing their nomination papers with the RO.'
  },
  {
    id: 'withdrawal',
    title: 'Last Date for Withdrawal',
    date: '2026-11-20',
    category: 'Candidates',
    description: 'Final opportunity for candidates to withdraw their nominations.'
  },
  {
    id: 'polling-day',
    title: 'Main Polling Day',
    date: '2026-12-05',
    category: 'Voting',
    description: 'All polling stations will be open from 7:00 AM to 6:00 PM.'
  },
  {
    id: 'results',
    title: 'Counting of Votes',
    date: '2026-12-10',
    category: 'Results',
    description: 'Counting will commence at 8:00 AM across all counting centers.'
  }
];

export const FAQ_DATA = [
  {
    question: "How can I check if my name is in the Voter List?",
    answer: "You can check your name in the electoral roll by visiting 'electoralsearch.in' or using the Voter Helpline App. You can search by your EPIC number or by providing your personal details."
  },
  {
    question: "What is Form 6 used for?",
    answer: "Form 6 is used for 'New Registration' as a voter. If you have turned 18 or have never registered before, you should fill this form."
  },
  {
    question: "Can I vote if I don't have a Voter ID card (EPIC)?",
    answer: "Yes, you can still vote if your name is in the electoral roll. You can use other valid photo ID documents approved by the ECI, such as Aadhaar Card, PAN Card, Driving License, or Passport."
  },
  {
    question: "What should I do if I have moved to a new city?",
    answer: "If you have changed your residence, you need to fill 'Form 8' for shifting of residence to get your name registered in the new constituency."
  },
  {
    question: "What is the 'Model Code of Conduct'?",
    answer: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India for political parties and candidates to ensure free and fair elections."
  },
  {
    question: "Is there any provision for voting for NRIs?",
    answer: "Yes, Indian citizens living abroad can register as 'Overseas Voters' by filling Form 6A. However, they must be physically present at their polling station in India on the day of voting."
  }
];

export const ELECTION_RESULTS_DATA = {
  national: [
    { party: 'Party A', seats: 210, color: '#EA580C', voteShare: 38 },
    { party: 'Party B', seats: 185, color: '#2563EB', voteShare: 32 },
    { party: 'Party C', seats: 85, color: '#16A34A', voteShare: 15 },
    { party: 'Others', seats: 63, color: '#94A3B8', voteShare: 15 },
  ],
  statesWins: [
    { state: 'Uttar Pradesh', winner: 'Party A', lead: 'High' },
    { state: 'Maharashtra', winner: 'Party B', lead: 'Medium' },
    { state: 'West Bengal', winner: 'Party C', lead: 'High' },
    { state: 'Bihar', winner: 'Party A', lead: 'Medium' },
    { state: 'Tamil Nadu', winner: 'Party C', lead: 'High' },
    { state: 'Karnataka', winner: 'Party B', lead: 'Low' },
  ],
  trends: [
    { time: '8:00 AM', partyA: 10, partyB: 5, partyC: 2 },
    { time: '10:00 AM', partyA: 45, partyB: 30, partyC: 15 },
    { time: '12:00 PM', partyA: 120, partyB: 110, partyC: 40 },
    { time: '2:00 PM', partyA: 180, partyB: 160, partyC: 70 },
    { time: '4:00 PM', partyA: 210, partyB: 185, partyC: 85 },
  ]
};
