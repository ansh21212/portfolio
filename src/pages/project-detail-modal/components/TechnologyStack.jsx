import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechnologyStack = ({ technologies = [] }) => {
  const getTechIcon = (tech) => {
    const techIcons = {
      'React': 'Code',
      'JavaScript': 'Code2',
      'TypeScript': 'FileCode',
      'Node.js': 'Server',
      'Express': 'Zap',
      'MongoDB': 'Database',
      'PostgreSQL': 'Database',
      'MySQL': 'Database',
      'Python': 'Code',
      'Django': 'Globe',
      'Flask': 'Flame',
      'Vue.js': 'Layers',
      'Angular': 'Triangle',
      'Next.js': 'ArrowRight',
      'Nuxt.js': 'Mountain',
      'Svelte': 'Sparkles',
      'Tailwind CSS': 'Palette',
      'SCSS': 'Paintbrush',
      'CSS3': 'Brush',
      'HTML5': 'FileText',
      'Docker': 'Package',
      'Kubernetes': 'Boxes',
      'AWS': 'Cloud',
      'Azure': 'CloudSnow',
      'Google Cloud': 'CloudRain',
      'Firebase': 'Flame',
      'Vercel': 'Zap',
      'Netlify': 'Globe',
      'Git': 'GitBranch',
      'GitHub': 'Github',
      'GitLab': 'GitMerge',
      'Figma': 'Figma',
      'Adobe XD': 'Layers',
      'Photoshop': 'Image',
      'Illustrator': 'PenTool',
      'Webpack': 'Package2',
      'Vite': 'Zap',
      'Rollup': 'Package',
      'Jest': 'TestTube',
      'Cypress': 'Bug',
      'Playwright': 'Play',
      'Storybook': 'Book',
      'GraphQL': 'Share2',
      'REST API': 'Globe',
      'Socket.io': 'Wifi',
      'Redis': 'Zap',
      'Elasticsearch': 'Search',
      'Nginx': 'Server',
      'Apache': 'Globe',
      'Linux': 'Terminal',
      'Ubuntu': 'Circle',
      'CentOS': 'Shield',
      'Windows': 'Monitor',
      'macOS': 'Laptop'
    };
    return techIcons[tech] || 'Code';
  };

  const getTechColor = (tech) => {
    const techColors = {
      'React': '#61DAFB',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'Vue.js': '#4FC08D',
      'Angular': '#DD0031',
      'Next.js': '#000000',
      'Tailwind CSS': '#06B6D4',
      'MongoDB': '#47A248',
      'PostgreSQL': '#336791',
      'MySQL': '#4479A1',
      'Docker': '#2496ED',
      'AWS': '#FF9900',
      'Firebase': '#FFCA28',
      'Git': '#F05032',
      'GitHub': '#181717',
      'Figma': '#F24E1E'
    };
    return techColors[tech] || '#6B7280';
  };

  if (!technologies.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-100">Technologies Used</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-slate-700 hover:bg-slate-600 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex flex-col items-center space-y-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${getTechColor(tech)}20` }}
              >
                <Icon 
                  name={getTechIcon(tech)} 
                  size={20} 
                  color={getTechColor(tech)} 
                />
              </div>
              <span className="text-sm font-medium text-slate-200 text-center leading-tight">
                {tech}
              </span>
            </div>
            
            {/* Hover Glow Effect */}
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at center, ${getTechColor(tech)}, transparent 70%)` 
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyStack;