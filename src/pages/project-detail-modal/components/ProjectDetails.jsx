import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectDetails = ({ project }) => {
  const {
    title = "Untitled Project",
    description = "No description available",
    longDescription = "",
    features = [],
    challenges = [],
    solutions = [],
    timeline = "",
    role = "",
    teamSize = "",
    liveUrl = "",
    githubUrl = "",
    figmaUrl = "",
    status = "Completed"
  } = project || {};

  const projectStats = [
    { label: "Status", value: status, icon: "CheckCircle" },
    { label: "Timeline", value: timeline || "3 months", icon: "Calendar" },
    { label: "Role", value: role || "Full Stack Developer", icon: "User" },
    { label: "Team Size", value: teamSize || "Solo Project", icon: "Users" }
  ].filter(stat => stat.value);

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'text-green-400 bg-green-400/10',
      'In Progress': 'text-yellow-400 bg-yellow-400/10',
      'Planning': 'text-blue-400 bg-blue-400/10',
      'On Hold': 'text-orange-400 bg-orange-400/10'
    };
    return colors[status] || 'text-slate-400 bg-slate-400/10';
  };

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
              <Icon name="CheckCircle" size={14} className="mr-1" />
              {status}
            </div>
          </div>
        </div>
        
        <p className="text-lg text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Project Stats */}
      {projectStats.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projectStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Icon name={stat.icon} size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="font-medium text-slate-200">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detailed Description */}
      {longDescription && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-100">About This Project</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {longDescription}
            </p>
          </div>
        </div>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-100">Key Features</h3>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
              >
                <Icon name="Check" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges & Solutions */}
      {(challenges.length > 0 || solutions.length > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100">Challenges</h3>
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-800/30"
                  >
                    <Icon name="AlertTriangle" size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {solutions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100">Solutions</h3>
              <div className="space-y-3">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-green-900/20 rounded-lg border border-green-800/30"
                  >
                    <Icon name="Lightbulb" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
        {liveUrl && (
          <Button
            variant="primary"
            onClick={() => window.open(liveUrl, '_blank')}
            iconName="ExternalLink"
            iconPosition="right"
            className="flex-1"
          >
            View Live Project
          </Button>
        )}
        
        {githubUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(githubUrl, '_blank')}
            iconName="Github"
            iconPosition="right"
            className="flex-1"
          >
            View Source Code
          </Button>
        )}
        
        {figmaUrl && (
          <Button
            variant="secondary"
            onClick={() => window.open(figmaUrl, '_blank')}
            iconName="Figma"
            iconPosition="right"
            className="flex-1"
          >
            View Design
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;