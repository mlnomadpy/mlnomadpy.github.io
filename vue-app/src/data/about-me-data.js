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
    content: `<p>I didn't start with a roadmap; I started with curiosity. Growing up in Tamazgha, the world outside felt vast and full of secrets I was desperate to uncover. My journey wasn't about following a set path, but about asking "why" and "how"—a relentless need to peel back the layers of the ordinary to find the wonder underneath.</p>
    <p>Today, people might define me by my work, but at my core, I am still that curious kid, a "Nomad" navigating the landscapes of life. I am driven not by a need to conquer, but by a need to understand—to build bridges between where I came from and where I am going, and to find meaning in the spaces between.</p>`,
    quote: "The titles are just waypoints. The real journey is the relentless pursuit of understanding."
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    heading: 'My Philosophy',
    backgroundImage: "url('/imgs/bg-philosophy.jpg'), linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)",
    content: `<p>I learned early on that if you wait for a guide, you might never leave the starting line. Navigating life without a clear map meant I had to build my own compass. Failures weren't setbacks; they were lessons—essential steps in the long walk of personal growth. I made a pact with myself: never fear the stumble, only the refusal to get back up.</p>
    <p>My philosophy is simple: remain perpetually curious. The moment we think we know enough is the moment we stop growing. I don't fear the unknown; I fear the stagnation of comfort. This hunger for knowledge isn't about status or achievement; it's the fuel that sustains my spirit and gives meaning to the struggle.</p>`,
    quote: "I don't fear the unknown. I fear the loss of the hunger to seek the unknown."
  },
  {
    id: 'reflection',
    title: 'Reflection',
    heading: 'The Quiet Spaces',
    backgroundImage: "url('/imgs/bg-reflection.jpg'), linear-gradient(135deg, #533e1e 0%, #785529 100%)",
    content: `<p>In moments of isolation, when the noise of the world faded, I found my strongest ally in writing. It became more than just a habit; it was a sanctuary. By forcing my thoughts onto paper, I could take the vague, overwhelming anxieties of life and give them shape, understanding them rather than running from them.</p>
    <p>This introspection is how I ground myself. It bridges the gap between what I feel and what I understand, allowing me to transform raw emotion into clarity and purpose. Writing is the act of listening to one's own life, ensuring that no lesson is lost to the chaos of the everyday.</p>`,
    quote: "Writing is how I listen to my own life and compile my experiences into wisdom."
  },
  {
    id: 'journey',
    title: 'Journey',
    heading: 'The Crossroads',
    backgroundImage: "url('/imgs/bg-journey.jpg'), linear-gradient(135deg, #5c4726 0%, #856030 100%)",
    content: `<p>There was a defining moment where I stood at a crossroads—separated from everything familiar, with nothing but my own resolve. It was terrifying, but it was also the moment I truly became free. I realized that while I couldn't control the circumstances around me, I had absolute dominion over my response.</p>
    <p>I channeled that energy into moving forward. Every step I took wasn't just a motion—it was an assertion of existence. My journey from the mountains of North Africa to where I stand today is a testament to the power of resilience. I carry my roots with me, proving that where we start does not dictate where we end, and that ambition, when coupled with action, can bridge any divide.</p>`,
    quote: "Every step is a proof that where you start doesn't dictate where you end."
  },
  {
    id: 'path',
    title: 'Path',
    heading: 'Where to Next? —Iskanmagar',
    backgroundImage: "url('/imgs/bg-path.jpg'), linear-gradient(135deg, #654f2d 0%, #926a36 100%)",
    content: `<p>I don't have a fixed coordinate for the destination. The spirit of "Iskanmagar" guides me—the belief that the path itself is the destination. I find myself drawn not to the easy comforts, but to the challenges that scare me. I've learned that fear is often just a compass pointing towards where I need to grow next.</p>
    <p>I'm not chasing a static state of happiness, but a dynamic state of evolution. The goal is to keep moving, to keep learning, and to ensure that with every step, I'm staying true to the curiosity that started it all. As long as there are questions left to answer, my journey continues.</p>`,
    quote: "I embrace the fear, for it is the only reliable compass pointing toward growth."
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
    company: 'Azetta.ai',
    title: 'Research Scientist/Co-Founder',
    location: 'San Francisco, CA',
    period: 'September 2025—Present',
    sections: [
      {
        title: 'R&D',
        details: [
          'Pioneering Physics-Inspired AI architectures for white-box intelligence',
          'Developing deep learning models with physical constraints for inherent interpretability',
          'Advancing the theoretical foundations of Neural-Matter Networks and safe AI'
        ]
      },
      {
        title: 'Products',
        details: [
          'CosmaDB: The physics-inspired vector database for infinite-scale high-dimensional data',
          'OmniEm: Omnilingual embedding models for universal semantic understanding',
          'Periodica: Continuous explainability and monitoring platform for AI observability'
        ]
      }
    ]
  },
  {
    company: 'MLNomads L.L.C',
    title: 'Research Scientist/C.E.O',
    location: 'San Francisco, CA',
    period: 'November 2024—September 2025',
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