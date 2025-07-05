import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

gsap.registerPlugin(ScrollTrigger);

const ResumeDocument = () => {
  const documentRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    
    // Animate sections on scroll
    sections.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section, 
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const resumeData = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Full Stack Developer",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      website: "alexjohnson.dev",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    summary: `Passionate full-stack developer with 6+ years of experience building scalable web applications and leading development teams. Expertise in React, Node.js, and cloud technologies with a strong focus on user experience, performance optimization, and modern development practices. Proven track record of delivering high-quality solutions that drive business growth.`,
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "TechFlow Solutions",
        period: "2022 - Present",
        location: "San Francisco, CA",
        achievements: [
          "Led development of microservices architecture serving 2M+ active users",
          "Improved application performance by 45% through code optimization and caching strategies",
          "Mentored team of 5 junior developers and established coding standards",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Architected real-time chat system handling 100K+ concurrent connections"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "Digital Innovations Inc.",
        period: "2020 - 2022",
        location: "San Francisco, CA",
        achievements: [
          "Built responsive web applications using React, TypeScript, and Node.js",
          "Collaborated with design team to implement pixel-perfect user interfaces",
          "Reduced bundle size by 35% through code splitting and optimization techniques",
          "Integrated third-party APIs and payment systems for e-commerce platform",
          "Developed automated testing suite achieving 90% code coverage"
        ]
      },
      {
        title: "Frontend Developer",
        company: "StartupHub Technologies",
        period: "2018 - 2020",
        location: "San Francisco, CA",
        achievements: [
          "Developed interactive dashboards using React and D3.js for data visualization",
          "Implemented responsive design principles ensuring cross-browser compatibility",
          "Optimized website performance achieving 95+ Lighthouse scores",
          "Created reusable component library used across multiple projects"
        ]
      }
    ],
    skills: {
      'Frontend Technologies': ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'SASS/SCSS'],
      'Backend Technologies': ['Node.js', 'Express.js', 'Python', 'Django', 'GraphQL', 'REST APIs'],
      'Database & Storage': ['PostgreSQL', 'MongoDB', 'Redis', 'AWS S3', 'Firebase'],
      'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform'],
      'Tools & Others': ['Git', 'Jest', 'Cypress', 'Figma', 'Jira', 'Agile/Scrum']
    },
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "Stanford University",
        period: "2016 - 2018",
        location: "Stanford, CA",
        gpa: "3.9/4.0",
        relevant: "Specialization in Software Engineering and Machine Learning"
      },
      {
        degree: "Bachelor of Science in Computer Engineering",
        school: "University of California, Berkeley",
        period: "2012 - 2016",
        location: "Berkeley, CA",
        gpa: "3.7/4.0",
        relevant: "Magna Cum Laude, Dean's List"
      }
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "Certified Kubernetes Administrator (CKA)",
      "MongoDB Certified Developer"
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
      },
      {
        name: "Real-time Analytics Dashboard",
        description: "Interactive dashboard for business intelligence and data visualization",
        technologies: ["Vue.js", "Python", "MongoDB", "D3.js"]
      }
    ]
  };

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={documentRef} className="bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden">
      {/* Header Section */}
      <div ref={addToRefs} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image
              src={resumeData.personalInfo.profileImage}
              alt={resumeData.personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
            <p className="text-xl mb-4 opacity-90">{resumeData.personalInfo.title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Icon name="Mail" size={16} color="white" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Icon name="Phone" size={16} color="white" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Icon name="MapPin" size={16} color="white" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Icon name="Globe" size={16} color="white" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {resumeData.summary}
          </p>
        </section>

        {/* Professional Experience */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-lg text-blue-600 font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-2 mt-3">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Icon name="ChevronRight" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Icon name="Code" size={18} className="text-blue-600" />
                  <span>{category}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                    {edu.relevant && (
                      <p className="text-sm text-gray-600 mt-1">{edu.relevant}</p>
                    )}
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <span className="text-sm text-gray-500 font-mono bg-white px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                <Icon name="Award" size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section ref={addToRefs}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
            Key Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeDocument;