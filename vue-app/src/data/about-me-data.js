export const tabs = [
  { id: 'story', label: 'My Story', icon: 'fas fa-book-open' },
  { id: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
  { id: 'certifications', label: 'Certifications', icon: 'fas fa-certificate' },
  { id: 'awards', label: 'Awards', icon: 'fas fa-award' },
  { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' }
];

export const storyItems = [
  {
    id: 'origins',
    title: 'Origins',
    heading: 'Who am I?',
    backgroundImage: "url('/imgs/bg-origins.jpg'), linear-gradient(135deg, #412c0f 0%, #5a421c 100%)",
    content: `<p>Jake* of all trades, Master of Data Science. I've always been captivated by the beauty and transformative power of computing, driven to understand its inner workings, become part of its evolution, and contribute meaningful innovations. My journey as a researcher, engineer, and nomad has taken me across diverse realms of knowledge, fueled by an insatiable curiosity about machine learning and the quest to make artificial intelligence more transparent and interpretable.</p>
    <p>As founder and CEO of MLNomads and recognized Google Developer Expert in AI/ML, I've earned various titles. Yet beyond these labels exists someone navigating the complex intersections of technology, identity, and purpose. At my core, I build bridges—connecting mathematical foundations of machine learning with practical applications, linking opaque neural networks with interpretable models, and bridging the gap between what AI is today and what it could become tomorrow.</p>`,
    quote: "Beyond titles lies a person navigating the complex landscapes of technology, identity, and purpose."
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    heading: 'My Philosophy in a Nutshell',
    backgroundImage: "url('/imgs/bg-philosophy.jpg'), linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)",
    content: `<p>From a young age, I found myself making critical decisions without guidance, relying solely on intuition, dedication, and determination to overcome obstacles in my path. I've encountered numerous failures along the way but transformed each one into a learning opportunity, ensuring I never repeat the same mistakes twice.</p>
    <p>Through navigating these challenges, I've cultivated a profound passion for knowledge and learning that has shaped my character and contributed to my modest achievements. For me, the true fear isn't facing the unknown—it's losing the desire to seek knowledge in the first place.</p>
    <p>I am, above all, a lifelong learner with an unquenchable thirst for education. This love of learning sustains me and will continue to guide my journey for as long as I live. I'm grateful for every hardship that has shaped my path, as each challenge has deepened my appreciation for the world's beauty and complexity, reinforcing my commitment to continuous growth and understanding.</p>`,
    quote: "For me, it is not the unknown that I fear, but the loss of my desire to seek knowledge."
  },
  {
    id: 'reflection',
    title: 'Reflection',
    heading: 'On Writing and Self-Reflection',
    backgroundImage: "url('/imgs/bg-reflection.jpg'), linear-gradient(135deg, #533e1e 0%, #785529 100%)",
    content: `<p>When quality mentorship and mental health education are inaccessible, we must discover alternative methods of self-care and growth. Writing has become my most powerful tool—a way to express and explore emotions, thoughts, and experiences with remarkable clarity.</p>
    <p>By committing thoughts to paper, we process and make sense of complex emotions in ways that verbal communication alone cannot achieve. Through consistent writing practice, patterns and themes emerge from our experiences, offering valuable insights into how events have shaped us and illuminating paths toward deeper self-understanding.</p>
    <p>Ultimately, writing serves as both a window to our inner world and a bridge to understanding others. This same philosophy guides my research approach: document meticulously, reflect honestly, refine continuously, and share generously. Through this process, both personal growth and scientific advancement become possible.</p>`,
    quote: "Writing is a window to our own minds and a bridge to understanding others."
  },
  {
    id: 'journey',
    title: 'Journey',
    heading: 'How Did I Get Here?',
    backgroundImage: "url('/imgs/bg-journey.jpg'), linear-gradient(135deg, #5c4726 0%, #856030 100%)",
    content: `<p>I found myself at a crossroads—alone and separated from the people and things that once anchored my life. In that moment of stark clarity, I realized all I truly possessed were my mind, accumulated knowledge, and cultivated skills.</p>
    <p>Facing this loss and adversity, I embraced the belief that I could actively shape my destiny. Rather than settling for passive complaints about the world's imperfections, I channeled that dissatisfaction into curiosity and action, refusing to cling to empty ideals without backing them with concrete efforts.</p>
    <p>Throughout these challenges, I've remained faithful to my identity and heritage while pursuing my dream of becoming a research scientist from Tamazgha, using computer science as a force for positive change. Each algorithm I develop, model I train, and paper I publish represents another step on this journey—not merely advancing the field, but honoring my roots and inspiring others from similar backgrounds to pursue their ambitions regardless of their starting point.</p>`,
    quote: "Each algorithm I write is another step on this path—not just to advance the field, but to represent my roots."
  },
  {
    id: 'path',
    title: 'Path',
    heading: 'Where Are You Headed? —Iskanmagar',
    backgroundImage: "url('/imgs/bg-path.jpg'), linear-gradient(135deg, #654f2d 0%, #926a36 100%)",
    content: `<p>As I navigate life's uncertain terrain, I find myself drawn to experiences that challenge and inspire growth. I'm not seeking a predetermined destination but am driven by an intrinsic desire to learn, evolve, and make meaningful contributions to the world around me.</p>
    <p>Rather than chasing the elusive concept of happiness, I deliberately seek out what I fear most—recognizing that true growth and fulfillment emerge from confronting these fears directly, not avoiding them. This approach has transformed obstacles into opportunities for profound development.</p>
    <p>I've come to understand that change represents the only true constant, and I embrace it wholeheartedly, recognizing the endless opportunities for learning and growth it presents. Throughout my journey, I continuously push beyond comfortable boundaries, constantly striving to improve and evolve.</p>
    <p>This philosophical approach shapes my current research focus on Neural Matter Networks, contrastive learning methods, and transparent AI systems—each representing another manifestation of my core values. By venturing into uncharted territories, confronting difficult challenges in our field, and persevering through complexity, I hope to emerge with valuable contributions that benefit both science and society.</p>`,
    quote: "I seek out the things that I fear the most, for it is in confronting these fears that I find true growth."
  }
];

export const educationItems = [
  {
    period: '2024',
    title: 'Master of Science in Electrical and Computer Engineering',
    subtitle: 'Henry M. Rowan College of Engineering, Rowan University',
    description: 'December 2024'
  },
  {
    period: '2022',
    title: 'Master of Science in Data Science',
    subtitle: 'Faculty of Science Agadir, Ibnou Zohr University',
    description: 'July 2022'
  },
  {
    period: ' 2020',
    title: 'Bachelor of Science in Mathematics and Computer Science',
    subtitle: 'Faculty of Science Agadir, Ibnou Zohr University',
    description: 'September 2020'
  }
];

export const certificationItems = [
  {
    title: "TensorFlow Developer Certificate",
    skills: "Deep Learning / TensorFlow / MLOps",
    issuer: "TensorFlow.org",
    date: "December 2021",
    icon: "fab fa-tensorflow"
  },
  {
    title: "Software Design and Architecture",
    skills: "Software Architecture / Design Patterns / UML",
    issuer: "University of Alberta",
    date: "October 2020",
    icon: "fas fa-sitemap"
  },
  {
    title: "Software Product Management Specialization",
    skills: "Scrum / Agile / Product Management",
    issuer: "University of Alberta",
    date: "August 2020",
    icon: "fas fa-tasks"
  },
  {
    title: "Deep Learning Specialization",
    skills: "Python / TensorFlow / Deep Learning",
    issuer: "deeplearning.ai",
    date: "July 2020",
    icon: "fas fa-brain"
  }
];

export const awardItems = [
  {
    title: 'AI/ML Google Developer Expert',
    description: 'Recognition for expertise and contributions to the AI/ML community',
    icon: 'fas fa-award'
  },
  {
    title: 'Rowan Research Fellowship Award',
    description: 'Award for research excellence at Rowan University',
    icon: 'fas fa-medal'
  },
  {
    title: 'Google Scholarship: Professional Certificate',
    description: 'Recognition of professional development in Google technologies',
    icon: 'fab fa-google'
  },
  {
    title: 'Google Scholarship: TensorFlow Certificate',
    description: 'Recognition of TensorFlow expertise and contributions',
    icon: 'fab fa-tensorflow'
  }
];

export const experienceItems = [
  {
    company: 'MLNomads L.L.C',
    title: 'Research Scientist/C.E.O',
    location: 'MARLTON, NJ',
    period: 'November 2024—Present',
    sections: [
      {
        title: 'R&D',
        details: [
          'Pre-Training next generation of white box neural networks architecture using Neural-Matter Networks',
          'Pre-training and Fine-Tuning deep learning models using SimO2 and AFCL frameworks',
          'Building Security pipelines to Audit the model weights to detect potential vulnerabilities'
        ]
      },
      {
        title: 'Tech',
        details: [
          'bashnota: Building next generation platform for building and training AI System for modern non-linear workflow (Jupyter Notebooks Alternative)',
          'AtomicVDB: a state-of-the art Vector Database built on top of jax',
          'LocalAgents.ts: a typescript library for building LLM agents on your browser'
        ]
      }
    ]
  },
  {
    company: 'Rowan University - College of Science and Mathematics',
    title: 'Lecturer / Adjunct Faculty',
    location: 'Glassboro, NJ',
    period: 'September 2023–December 2024',
    details: [
      'Teaching 300-level course in Cyber Security',
      'Developing curriculum and course materials',
      'Mentoring students in computer science and cybersecurity'
    ]
  },
  {
    company: 'Henry M.Rowan College of Engineering / Federal Aviation Administration',
    title: 'Machine Learning Graduate Research Assistant',
    location: 'Glassboro, NJ',
    period: 'January 2023–December 2024',
    details: [
      'Developed a cutting-edge multimodal system for in-flight atmospheric visibility estimation (collaboration with Rowan University and US Federal Aviation Administration)',
      'Specialized in Multimodal Deep Learning techniques and applications',
      'Utilized X-Plane to create a comprehensive dataset for in-flight visibility estimation'
    ]
  },
  {
    company: 'Henry M.Rowan College of Engineering / Federal Aviation Administration',
    title: 'Machine Learning Engineer Intern',
    location: 'Glassboro, NJ',
    period: 'February 2022–July 2022',
    details: [
      'Developed an atmospheric visibility estimation system using RGB image-based approaches',
      'Led the project from problem framing and in-depth research to dataset curation, model development, training, and evaluation'
    ]
  },
  {
    company: 'IRF-SIC Laboratory',
    title: 'Satellite Imagery Machine Learning Engineer Intern',
    location: 'Agadir, Morocco',
    period: 'February 2022–July 2022',
    details: [
      'Responsible for problem framing, model structuring, and implementation',
      'Developed an AI-based system for change detection in Argania forests using satellite imagery'
    ]
  },
  {
    company: 'Freelancer / Consultant',
    title: 'Software Engineer',
    location: 'Agadir, Morocco',
    period: 'July 2016–Present',
    details: [
      'Full Stack Web Development services for various clients',
      'Android application development and deployment',
      'AI Engineering and machine learning solutions',
      'Technical consulting and project management'
    ]
  }
];

export const profileData = {
  name: 'Taha Bouhsine',
  nativeTitle: 'ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ',
  tagline: 'ML Researcher & Engineer | Google Developer Expert in AI/ML | CEO of MLNomads',
  quote: 'I build bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models',
  socialLinks: [
    { 
      name: 'Google Scholar', 
      url: 'https://scholar.google.com/', 
      icon: 'fas fa-graduation-cap',
      external: true 
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/mlnomadpy', 
      icon: 'fab fa-github',
      external: true 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/Tahabsn', 
      icon: 'fab fa-linkedin',
      external: true 
    },
    { 
      name: 'Email', 
      url: 'mailto:tahabhs14@gmail.com', 
      icon: 'fas fa-envelope',
      external: false 
    },
    { 
      name: 'Personal Website', 
      url: 'https://www.tahabouhsine.com', 
      icon: 'fas fa-globe',
      external: true 
    }
  ]
}; 