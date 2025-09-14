// ai-chat-logic.js
// Detailed AI chat logic for specific courses and general topics

function getAIResponse(userMsg) {
  const input = userMsg.toLowerCase();
  let aiResponse =
    "I'm your AI professor! Ask me about web development, data science, AI, Python, Android, or request a developer roadmap. I'll guide you with advice and resources.";

  // User doesn't know what to learn
  if (
    input.includes("i don't know what to learn") ||
    input.includes("dont know what to learn") ||
    input.includes("i am confused") ||
    input.includes("confused")
  ) {
    aiResponse = `No worries! Many beginners feel this way. Here’s some advice:\n- If you want to build websites, start with HTML, CSS, and JavaScript.\n- For data science, Python is the best choice.\n- For mobile apps, try Java/Kotlin (Android) or Swift (iOS).\n- For game development, C# (Unity) or C++ (Unreal) are popular.\n- If you want a versatile language, Python is beginner-friendly and used everywhere.\nLet me know your interests (web, data, mobile, games) and I’ll suggest a roadmap!`;
  }
  // Which programming language is best
  else if (
    input.includes("which programming language is best") ||
    input.includes("best programming language") ||
    input.includes("which language should i learn") ||
    input.includes("language to start")
  ) {
    aiResponse = `The best programming language depends on your goals:\n- Web development: JavaScript\n- Data science & AI: Python\n- Mobile apps: Java/Kotlin (Android), Swift (iOS)\n- Game development: C# (Unity), C++ (Unreal)\n- General purpose: Python\nIf you’re unsure, start with Python—it’s easy, powerful, and in high demand!`;
  }
  // Cybersecurity (full details)
  else if (input.includes("cybersecurity")) {
    if (input.includes("beginner")) {
      aiResponse = `Cybersecurity Beginner Roadmap:\n1. Basic security concepts\n2. Firewalls, antivirus, encryption\n3. Common threats: phishing, malware\n4. Hands-on labs: TryHackMe, Hack The Box\n5. Network basics\nAdvice: Stay updated on security news and practice regularly.`;
    } else if (input.includes("advanced")) {
      aiResponse = `Cybersecurity Advanced Roadmap:\n1. Penetration testing\n2. Network security\n3. Incident response\n4. Certifications: CEH, CISSP, OSCP\n5. Security audits\nAdvice: Get certified and join security communities.`;
    } else {
      aiResponse = `Cybersecurity Full Roadmap:\n- Security concepts\n- Network basics\n- Threats & defenses\n- Pen testing\n- Certifications\nAdvice: Start with basics, then specialize. Ask for 'cybersecurity beginner' or 'cybersecurity advanced' for more details.`;
    }
  }
  // Cloud Computing (full details)
  else if (input.includes("cloud computing")) {
    if (input.includes("aws")) {
      aiResponse = `Cloud Computing with AWS Roadmap:\n1. AWS core services: EC2, S3, Lambda\n2. IAM & security\n3. Practice with AWS Free Tier\n4. Deploy a simple app\n5. Study for AWS Certified Cloud Practitioner\nAdvice: Use AWS documentation and hands-on labs.`;
    } else if (input.includes("azure")) {
      aiResponse = `Cloud Computing with Azure Roadmap:\n1. Azure basics: VMs, Storage, Functions\n2. Azure Portal\n3. Practice with Microsoft Learn\n4. Deploy a simple app\n5. Study for Azure Fundamentals certification\nAdvice: Explore Azure Marketplace for solutions.`;
    } else {
      aiResponse = `Cloud Computing Full Roadmap:\n- AWS, Azure, or Google Cloud basics\n- Core services\n- Security\n- App deployment\n- Certifications\nAdvice: Pick one provider and build a cloud project. Ask for 'cloud computing aws' or 'cloud computing azure' for more details.`;
    }
  }

  // UI/UX Design (full details)
  else if (input.includes("ui/ux design")) {
    aiResponse = `UI/UX Design Full Roadmap:\n1. Design principles: color, typography, layout\n2. Tools: Figma, Adobe XD, Sketch\n3. Wireframing & prototyping\n4. User research & usability testing\n5. Build a portfolio\n6. Advanced: Animation, microinteractions\nAdvice: Practice by redesigning popular apps and websites.`;
  }

  // Blockchain (full details)
  else if (input.includes("blockchain")) {
    aiResponse = `Blockchain Full Roadmap:\n1. Distributed ledger technology\n2. Smart contracts: Solidity, Ethereum\n3. Use cases: crypto, NFTs, supply chain\n4. Build a simple DApp\n5. Advanced: Consensus algorithms, DeFi\nAdvice: Start with Ethereum and build a basic smart contract.`;
  }

  // DevOps (full details)
  else if (input.includes("devops")) {
    aiResponse = `DevOps Full Roadmap:\n1. CI/CD concepts\n2. Tools: Docker, Jenkins, Kubernetes\n3. Infrastructure as Code: Terraform\n4. Monitoring: Prometheus, Grafana\n5. Automate deployments\n6. Advanced: Cloud DevOps\nAdvice: Build a CI/CD pipeline for a sample project.`;
  }

  // Game Development (full details)
  else if (input.includes("game development")) {
    if (input.includes("unity")) {
      aiResponse = `Game Development with Unity Roadmap:\n1. Learn C# basics\n2. Unity Editor\n3. Build 2D/3D games\n4. Physics, animation\n5. Publish to PC or mobile\n6. Advanced: Multiplayer, AR/VR\nAdvice: Start with a simple 2D game and expand.`;
    } else if (input.includes("unreal")) {
      aiResponse = `Game Development with Unreal Engine Roadmap:\n1. Learn C++ basics\n2. Unreal Editor\n3. Build 3D games\n4. Physics, animation\n5. Publish to PC or console\n6. Advanced: Blueprints, multiplayer\nAdvice: Use Unreal Marketplace for assets.`;
    } else {
      aiResponse = `Game Development Full Roadmap:\n- Unity or Unreal basics\n- C# or C++\n- Editor tools\n- Build games\n- Physics, animation\n- Multiplayer, AR/VR\nAdvice: Pick a platform and build a small game. Ask for 'game development unity' or 'game development unreal' for more details.`;
    }
  }

  function randomGreeting() {
    const greetings = [
      "Hello! 👋 How can I help you today?",
      "Hi there! 😊 Ready to learn something new?",
      "Hey! 🚀 Ask me anything about tech or careers.",
      "Greetings! I'm here to guide you on your learning journey.",
      "Welcome! What would you like to explore today?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // General small talk
  if (/how are you|how's it going|what's up|how do you feel/.test(input)) {
    aiResponse =
      "I'm an AI, so I don't have feelings, but I'm always excited to help you learn and grow! 😊";
  } else if (
    /^(hi|hello|hey|greetings|good morning|good evening)/.test(input)
  ) {
    aiResponse = randomGreeting();
  } else if (input.includes("joke")) {
    aiResponse =
      "Why do programmers prefer dark mode? Because light attracts bugs! 😄";
  } else if (
    input.includes("motivate") ||
    input.includes("motivation") ||
    input.includes("inspire")
  ) {
    aiResponse =
      "Remember: Every expert was once a beginner. Keep going, your future self will thank you! 💪";
  }

  // Web Development (full details)
  else if (input.includes("web development")) {
    if (input.includes("beginner")) {
      aiResponse = `Web Development Beginner Roadmap:\n1. Learn HTML: Structure web pages\n2. Learn CSS: Style your pages\n3. Learn JavaScript: Add interactivity\n4. Responsive design: Make sites work on all devices\n5. Build simple projects: Portfolio, landing page\n6. Use free resources: freeCodeCamp, The Odin Project\n7. Practice on CodePen, GitHub\nAdvice: Focus on building real projects and sharing them online.`;
    } else if (input.includes("intermediate")) {
      aiResponse = `Web Development Intermediate Roadmap:\n1. Master a frontend framework: React, Vue, or Angular\n2. Learn version control: Git & GitHub\n3. Work with APIs: Fetch data, authentication\n4. Build complex projects: Blog, e-commerce site\n5. Learn basic backend: Node.js, Express\n6. Explore deployment: Netlify, Vercel\nAdvice: Collaborate on open source and join developer communities.`;
    } else if (input.includes("advanced")) {
      aiResponse = `Web Development Advanced Roadmap:\n1. Performance optimization: Lazy loading, code splitting\n2. DevOps basics: CI/CD, Docker\n3. Scalable architectures: Microservices, serverless\n4. Security best practices\n5. Contribute to open source\n6. Learn testing: Jest, Cypress\nAdvice: Build production-ready apps and mentor others.`;
    } else {
      aiResponse = `Web Development Full Roadmap:\nBeginner:\n- HTML, CSS, JavaScript basics\n- Responsive design\n- Simple projects (portfolio, landing page)\nIntermediate:\n- React, Vue, or Angular\n- APIs, authentication\n- Git & GitHub\n- Blog, e-commerce site\nAdvanced:\n- Performance, DevOps, scalable architectures\n- Security, testing\n- Open source\nAdvice: Start with beginner steps and move up as you build confidence. Ask for a specific level for more details!`;
    }
  }

  // Data Science (full details)
  else if (input.includes("data science")) {
    if (input.includes("python")) {
      aiResponse = `Data Science with Python Roadmap:\n1. Learn Python basics\n2. Data wrangling: Pandas, NumPy\n3. Data visualization: Matplotlib, Seaborn\n4. Statistics & probability\n5. Machine learning: scikit-learn, TensorFlow\n6. Real-world projects: Kaggle competitions\n7. Advanced: Deep learning, NLP\nAdvice: Build a portfolio of data projects and share on GitHub.`;
    } else if (input.includes("r language")) {
      aiResponse = `Data Science with R Roadmap:\n1. Learn R basics\n2. Data manipulation: dplyr, tidyr\n3. Visualization: ggplot2\n4. Statistical modeling\n5. Projects: Exploratory data analysis, regression models\n6. Advanced: Machine learning in R\nAdvice: Use R for statistical analysis and visualizations.`;
    } else {
      aiResponse = `Data Science Full Roadmap:\n- Python or R basics\n- Data wrangling\n- Visualization\n- Statistics\n- Machine learning\n- Deep learning\n- Real-world projects\nAdvice: Start with Python if unsure. Ask for 'data science python' or 'data science r language' for a tailored plan.`;
    }
  }

  // AI & Machine Learning (full details)
  else if (input.includes("ai") || input.includes("artificial intelligence")) {
    if (input.includes("machine learning")) {
      aiResponse = `Machine Learning Full Roadmap:\n1. Python & math foundations\n2. ML algorithms: regression, classification, clustering\n3. Data preprocessing\n4. Model evaluation & tuning\n5. Deep learning: TensorFlow, PyTorch\n6. Projects: Chatbots, image recognition, recommendation systems\n7. Advanced: NLP, reinforcement learning\nAdvice: Take Andrew Ng's ML course and build real ML projects.`;
    } else if (input.includes("deep learning")) {
      aiResponse = `Deep Learning Full Roadmap:\n1. Neural networks basics\n2. CNNs, RNNs, GANs\n3. TensorFlow, PyTorch\n4. Projects: Image classification, text generation, GANs\n5. Advanced: Transfer learning, attention mechanisms\nAdvice: Practice with open datasets and publish your models.`;
    } else {
      aiResponse = `AI Full Roadmap:\n- Python & math\n- ML algorithms\n- Deep learning\n- NLP\n- Reinforcement learning\n- AI ethics\nAdvice: Start with machine learning, then explore deep learning and NLP. Ask for 'ai machine learning' or 'ai deep learning' for more details.`;
    }
  }

  // Android Development (full details)
  else if (input.includes("android development")) {
    if (input.includes("java")) {
      aiResponse = `Android Development with Java Roadmap:\n1. Learn Java basics\n2. Install Android Studio\n3. Build UI with XML\n4. Activity lifecycle\n5. Data storage: SQLite, Room\n6. Publish a simple app\n7. Advanced: Firebase, push notifications\nAdvice: Use official Android docs and YouTube tutorials.`;
    } else if (input.includes("kotlin")) {
      aiResponse = `Android Development with Kotlin Roadmap:\n1. Learn Kotlin basics\n2. Android Studio setup\n3. Build UI with XML\n4. Activity lifecycle\n5. Data storage\n6. Publish a simple app\n7. Advanced: Coroutines, Jetpack Compose\nAdvice: Kotlin is modern and recommended for new Android apps.`;
    } else {
      aiResponse = `Android Development Full Roadmap:\n- Java or Kotlin basics\n- Android Studio\n- UI/UX design\n- Data storage\n- App publishing\n- Advanced: Firebase, Jetpack Compose\nAdvice: Start with Java or Kotlin and build simple apps. Ask for a specific language for more details.`;
    }
  }

  // Python (full details)
  else if (input.includes("python")) {
    if (input.includes("web")) {
      aiResponse = `Python for Web Development Roadmap:\n1. Learn Python basics\n2. Flask or Django\n3. Build REST APIs\n4. Frontend integration\n5. Deploy on Heroku, Vercel\n6. Advanced: Authentication, testing\nAdvice: Build a simple web app and deploy it online.`;
    } else if (input.includes("data")) {
      aiResponse = `Python for Data Science Roadmap:\n1. Pandas, NumPy, Matplotlib\n2. Data analysis projects\n3. Machine learning basics\n4. Visualization\n5. Advanced: Deep learning, NLP\nAdvice: Use Jupyter Notebook for experiments.`;
    } else if (input.includes("automation")) {
      aiResponse = `Python for Automation Roadmap:\n1. Scripting basics\n2. Automate tasks: file handling, web scraping\n3. Libraries: requests, selenium\n4. Build automation scripts\nAdvice: Automate repetitive tasks to save time.`;
    } else {
      aiResponse = `Python Full Roadmap:\n- Syntax & programming basics\n- Web: Flask, Django\n- Data: Pandas, NumPy, ML\n- Automation: scripting, web scraping\nAdvice: Start with basics, then pick a specialization. Ask for 'python web', 'python data', or 'python automation' for more details.`;
    }
  }

  // Full Stack Development (full details)
  else if (input.includes("full stack")) {
    if (input.includes("mern")) {
      aiResponse = `Full Stack MERN Roadmap:\n1. MongoDB: NoSQL database\n2. Express: Backend framework\n3. React: Frontend library\n4. Node.js: Server runtime\n5. Build a full-featured web app\n6. Authentication, deployment, CI/CD\nAdvice: Build a MERN project and deploy it on Heroku or Vercel.`;
    } else if (input.includes("mean")) {
      aiResponse = `Full Stack MEAN Roadmap:\n1. MongoDB\n2. Express\n3. Angular\n4. Node.js\n5. Build a full-featured web app\n6. Authentication, deployment, CI/CD\nAdvice: Angular is great for enterprise apps.`;
    } else {
      aiResponse = `Full Stack Development Full Roadmap:\n- Frontend: HTML, CSS, JS, React/Angular/Vue\n- Backend: Node.js, Express\n- Database: MongoDB, SQL\n- Authentication\n- Deployment\n- CI/CD\nAdvice: Build a portfolio with full stack projects. Ask for 'full stack mern' or 'full stack mean' for more details.`;
    }
  }

  // General advice
  else if (
    input.includes("which course") ||
    input.includes("what should i learn") ||
    input.includes("advice")
  ) {
    aiResponse = `Advice: Pick a course that excites you! If you love building things, try web or app development. If you enjoy numbers and patterns, data science is great. For innovation, AI is the way. Want a personalized suggestion? Tell me your interests or goals!`;
  }

  // Project ideas
  else if (input.includes("project idea") || input.includes("project")) {
    aiResponse = `Here are some project ideas:\n- Portfolio website\n- Weather app\n- Chatbot\n- Data visualizer\n- To-do list\nLet me know your skill level for more ideas!`;
  }

  // Exam, interview, and career help
  else if (
    input.includes("interview") ||
    input.includes("job") ||
    input.includes("career")
  ) {
    aiResponse = `Career Tip: Practice coding problems daily, build a strong portfolio, and network on LinkedIn. For interviews, focus on problem-solving and communication. Want mock interview questions? Just ask!`;
  } else if (input.includes("exam") || input.includes("test")) {
    aiResponse = `Exam Tip: Revise key concepts, practice sample questions, and take breaks. If you need help with a topic, just tell me!`;
  }

  // Fallback
  else {
    aiResponse =
      "I couldn't detect a specific interest or topic. Please enter any of your interests (like web development, data science, mobile apps, game development, cybersecurity, etc.) and I'll give you personalized advice!";
  }

  return aiResponse;
}

// Export for use in welcome.html
window.getAIResponse = getAIResponse;
