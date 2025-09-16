import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    "JavaScript is a powerful language for building dynamic, interactive, and modern web applications.",
  typescript:
    "TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.",
  react:
    "React is a popular library for building fast and modular user interfaces.",
  nextjs:
    "Next.js is a React framework for server-side rendering and building optimized web applications.",
  nodejs:
    "Node.js enables server-side JavaScript, allowing you to create fast, scalable network applications.",
  python:
    "Python is a versatile language known for readability and a vast ecosystem, often used for data science and automation.",
  java: "Java is an object-oriented language commonly used for enterprise applications and Android development.",
  cplusplus:
    "C++ is a high-performance language suitable for system software, game engines, and complex applications.",
  git: "Git is a version control system that tracks changes in source code during software development.",
  docker:
    "Docker is a container platform that simplifies application deployment and environment management.",
  mongodb:
    "MongoDB is a NoSQL database for handling large volumes of flexible, document-based data.",
  mysql:
    "MySQL is a popular relational database, known for reliability and ease of use.",
  postgresql:
    "PostgreSQL is a robust open-source relational database with advanced features and strong SQL compliance.",
  aws: "AWS is a comprehensive cloud platform offering a wide range of services for deployment, storage, and more.",
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  // Dictionary mapping possible technology names to Devicon class names
  const techMap: { [key: string]: string } = {
    // JavaScript variations
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",

    // TypeScript variations
    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",

    // React variations
    react: "devicon-react-original",
    reactjs: "devicon-react-original",

    // Next.js variations
    nextjs: "devicon-nextjs-plain",
    next: "devicon-nextjs-plain",

    // Node.js variations
    nodejs: "devicon-nodejs-plain",
    node: "devicon-nodejs-plain",

    // Bun.js variations
    bun: "devicon-bun-plain",
    bunjs: "devicon-bun-plain",

    // Deno.js variations
    deno: "devicon-denojs-original",
    denojs: "devicon-denojs-plain",

    // Python variations
    python: "devicon-python-plain",

    // Java variations
    java: "devicon-java-plain",

    // C++ variations
    "c++": "devicon-cplusplus-plain",
    cpp: "devicon-cplusplus-plain",

    // C# variations
    "c#": "devicon-csharp-plain",
    csharp: "devicon-csharp-plain",

    // PHP variations
    php: "devicon-php-plain",

    // HTML variations
    html: "devicon-html5-plain",
    html5: "devicon-html5-plain",

    // CSS variations
    css: "devicon-css3-plain",
    css3: "devicon-css3-plain",

    // Git variations
    git: "devicon-git-plain",

    // Docker variations
    docker: "devicon-docker-plain",

    // MongoDB variations
    mongodb: "devicon-mongodb-plain",
    mongo: "devicon-mongodb-plain",

    // MySQL variations
    mysql: "devicon-mysql-plain",

    // PostgreSQL variations
    postgresql: "devicon-postgresql-plain",
    postgres: "devicon-postgresql-plain",

    // AWS variations
    aws: "devicon-amazonwebservices-original",
    "amazon web services": "devicon-amazonwebservices-original",

    // Tailwind CSS variations
    tailwind: "devicon-tailwindcss-original",
    tailwindcss: "devicon-tailwindcss-original",
  };

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimeStamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.round(diffMilliseconds / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  }

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  return `${diffDays} days ago`;
};
