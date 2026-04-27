import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Patrick David Pagdatoon",
  role: "Information Technology Student | Web Applications",
  location: "Newark, NJ",
  intro:
    "I am an Information Technology student at NJIT focused on web applications, user experience, and practical full-stack delivery. I build products that are clear, useful, and grounded in real user needs.",
  socialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com/in/patrick-david-pagdatoon" },
    { label: "Email", href: "mailto:pdpagdatoon@gmail.com" },
    { label: "Phone", href: "tel:+17325814072" },
  ],
  skills: [
    "JavaScript",
    "Node.js",
    "Express.js",
    "Angular",
    "MongoDB",
    "SQL",
    "PHP",
    "HTML",
    "CSS",
    "Java",
    "Python",
    "C#",
    "Figma",
    "GitHub",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Canva",
    "VMware Workstation",
    "TypeScript",
  ],
  projects: [
    {
      title: "Distributed MEAN Price Comparison Web App",
      summary:
        "Built a distributed MEAN stack application to compare product prices across multiple retailers with secure account features.",
      techStack: ["MongoDB", "Express.js", "Angular", "Node.js", "Ubuntu VMs"],
      liveUrl: "https://example.com/mean-app",
      repoUrl: "https://github.com",
    },
    {
      title: "UX Maintenance Request App Prototype",
      summary:
        "Produced a high-usability Figma maintenance request app concept based on user research and streamlined communication flows.",
      techStack: ["Figma", "UX Research", "Interaction Design", "Information Architecture"],
      liveUrl: "https://example.com/ux-app",
      repoUrl: "https://github.com",
    },
  ],
  experience: [
    {
      company: "New Jersey Institute of Technology",
      role: "New Student Orientation Leader",
      period: "June 2024 - January 2026",
      highlights: [
        "Facilitated group activities to welcome and integrate incoming students into campus life.",
        "Provided guidance on academic and campus resources while supporting student concerns.",
        "Maintained a positive and inclusive environment to encourage student engagement.",
      ],
    },
  ],
  resumeHighlights: [
    {
      title: "NJIT Information Technology, B.S.",
      detail:
        "Web Applications specialization with expected graduation in May 2027, plus a Minor in Business and Dean's List recognition.",
    },
    {
      title: "Applied full-stack development",
      detail:
        "Hands-on implementation across JavaScript frameworks, backend APIs, databases, and virtualized infrastructure.",
    },
    {
      title: "UX and communication focus",
      detail:
        "Strong product-thinking approach shaped by UX coursework, user research, and leadership communication roles.",
    },
  ],
  prCampaigns: [
    {
      organization: "NJIT Baking Club",
      title: "Public Relations - Executive Board",
      summary:
        "Created social media content on Instagram and Discord to increase club engagement and promote interactive baking events.",
      outcomes: [
        "Built engagement-focused promotional posts for campus audiences.",
        "Strengthened collaborations by connecting with other organizations.",
      ],
      postImages: ["/posts/Get to Know (2).png"],
    },
    {
      organization: "Japanese Students Association",
      title: "Public Relations - Executive Board",
      summary:
        "Developed Instagram content and event concepts to connect Japanese students and peers interested in Japanese culture.",
      outcomes: [
        "Increased awareness through social-first event promotion.",
        "Co-developed culturally engaging campaigns with executive board teammates.",
      ],
      postImages: ["/posts/JSA GBM 1.png", "/posts/抹茶 (5).png"],
    },
    {
      organization: "Nucleus Yearbook Club",
      title: "Business Division Member",
      summary:
        "Designed promotional social posts with Canva and supported yearbook marketing campaigns through events and speaking.",
      outcomes: [
        "Created Instagram-focused materials to increase yearbook awareness.",
        "Promoted campaigns through clear communication at student events.",
      ],
      postImages: ["/posts/JSA GBM 2 Flyer (Instagram Post (45)) (1).png"],
    },
  ],
  contactEmail: "pdpagdatoon@gmail.com",
};