export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stack: string[];
  category: 'Frontend Website' | 'Full-Stack Web Application' | 'Web App' | 'Platform' | 'Open Source';
  year: string;
  liveUrl: string;
  githubUrl: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'taste-of-sindh',
    title: 'Taste of Sindh',
    tagline: 'A modern restaurant and food ordering experience.',
    description:
      'A responsive frontend web application designed to provide users with an engaging online food ordering experience. The project features a modern user interface, intuitive navigation, restaurant listings, featured meals, and a clean ordering workflow — all focused on responsive design and smooth user experience.',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
    category: 'Frontend Website',
    year: '2025',
    liveUrl: '#',
    githubUrl: '#',
    accent: '#C45A3D',
  },
  {
    slug: 'fashion-ecommerce',
    title: 'Fashion Store',
    tagline: 'Premium fashion e-commerce, built end-to-end.',
    description:
      'A complete full-stack fashion e-commerce platform featuring secure user authentication, product management, shopping cart, wishlist, order management, and an admin dashboard. Customers can browse collections, filter products, manage their profiles, and place orders through a premium shopping interface — backed by a RESTful API, cloud image storage, and a scalable database architecture.',
    image:
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Authentication',
      'Cloudinary',
      'Tailwind CSS',
    ],
    category: 'Full-Stack Web Application',
    year: '2026',
    liveUrl: '#',
    githubUrl: '#',
    accent: '#7A1F3D',
  },
  {
    slug: 'healthcare-appointments',
    title: 'Healthcare Appointment System',
    tagline: 'Booking care, made simple and accessible.',
    description:
      'A comprehensive appointment booking system that enables patients to register, search for doctors, book appointments, receive confirmations, and manage their medical visits. Healthcare providers can manage schedules, appointments, and patient records through a secure administrative dashboard — with a focus on accessibility, responsive design, and efficient appointment management.',
    image:
      'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1400',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Authentication',
      'Tailwind CSS',
    ],
    category: 'Full-Stack Web Application',
    year: '2026',
    liveUrl: '#',
    githubUrl: '#',
    accent: '#2E7A6B',
  },
];
