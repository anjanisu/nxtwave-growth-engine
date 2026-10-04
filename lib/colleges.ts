export interface PredefinedCollege {
  slug: string;
  name: string;
  city: string;
  state: string;
  coordinatorName: string;
  channelType: 'CLUB' | 'COORDINATOR' | 'FACULTY' | 'WHATSAPP' | 'PAID_ADS';
}

export const PREDEFINED_COLLEGES: PredefinedCollege[] = [
  {
    slug: 'jntu-hyd',
    name: 'Jawaharlal Nehru Technological University, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    coordinatorName: 'Karthik Rao (IEEE Student Chair)',
    channelType: 'CLUB',
  },
  {
    slug: 'vnit-nagpur',
    name: 'Visvesvaraya National Institute of Technology, Nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    coordinatorName: 'Ananya Sharma (Coding Club)',
    channelType: 'CLUB',
  },
  {
    slug: 'iit-bombay',
    name: 'Indian Institute of Technology, Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    coordinatorName: 'Rohan Mehta (Student Coordinator)',
    channelType: 'COORDINATOR',
  },
  {
    slug: 'srm-chennai',
    name: 'SRM Institute of Science and Technology, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    coordinatorName: 'Vikas Kumar (WhatsApp Lead)',
    channelType: 'WHATSAPP',
  },
  {
    slug: 'vit-vellore',
    name: 'Vellore Institute of Technology, Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    coordinatorName: 'Dr. S. Ranganathan (TPO Head)',
    channelType: 'FACULTY',
  },
  {
    slug: 'coep-pune',
    name: 'College of Engineering, Pune (COEP)',
    city: 'Pune',
    state: 'Maharashtra',
    coordinatorName: 'Pooja Kulkarni (ACM Student Chapter)',
    channelType: 'CLUB',
  },
  {
    slug: 'anna-univ',
    name: 'Anna University, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    coordinatorName: 'Suresh Babu (Campus Rep)',
    channelType: 'WHATSAPP',
  },
  {
    slug: 'kiit-bhubaneswar',
    name: 'Kalinga Institute of Industrial Technology, Bhubaneswar',
    city: 'Bhubaneswar',
    state: 'Odisha',
    coordinatorName: 'NxtWave Growth Experiment (Paid Ads)',
    channelType: 'PAID_ADS',
  },
  {
    slug: 'bits-pilani',
    name: 'BITS Pilani, Hyderabad Campus',
    city: 'Hyderabad',
    state: 'Telangana',
    coordinatorName: 'Aditya Verma (Tech Fest Lead)',
    channelType: 'COORDINATOR',
  },
  {
    slug: 'bmsce-bangalore',
    name: 'BMS College of Engineering, Bangalore',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinatorName: 'Nisha Gowda (DSC Club Lead)',
    channelType: 'CLUB',
  },
  {
    slug: 'nit-warangal',
    name: 'National Institute of Technology, Warangal',
    city: 'Warangal',
    state: 'Telangana',
    coordinatorName: 'Prof. K. Venkatesh (HOD CSE)',
    channelType: 'FACULTY',
  },
  {
    slug: 'iiit-hyd',
    name: 'International Institute of Information Technology, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    coordinatorName: 'Srinivas Reddy (Research Rep)',
    channelType: 'COORDINATOR',
  },
  {
    slug: 'gitam-vizag',
    name: 'GITAM University, Visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    coordinatorName: 'Sai Teja (Student Club)',
    channelType: 'CLUB',
  },
  {
    slug: 'other-colleges',
    name: 'Other Engineering Colleges (Organic Referral)',
    city: 'Pan India',
    state: 'Various',
    coordinatorName: 'NxtWave Community Referral',
    channelType: 'WHATSAPP',
  },
];
