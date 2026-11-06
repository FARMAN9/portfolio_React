/**
 * Canonical shared portfolio content layer.
 * Single source of truth for both the traditional 2D site and the 3D/WebXR experience.
 * All project names, links, descriptions, and credentials strictly match real data.
 */

import { portfolioProfile, portfolioSkills, portfolioProjects } from './portfolioKnowledge';

export { portfolioProfile, portfolioSkills, portfolioProjects };

export const OFFICE_STATIONS = [
  {
    id: 'welcome',
    name: 'Welcome Lobby',
    badge: 'ENTRY',
    icon: 'compass',
    position: [0, 0, 3.8],
    lookAt: [0, 1.6, 0],
    description: 'Welcome to Syed Farman Ali’s architectural developer studio. Explore the workstation, inspect project displays, examine the technical skills wall, or review credentials.'
  },
  {
    id: 'workstation',
    name: 'Executive Workstation',
    badge: 'PROFILE',
    icon: 'monitor',
    position: [0, 0, -1.8],
    lookAt: [0, 1.3, -3.2],
    description: 'Farman’s primary development desk featuring dual curved monitors, mechanical keyboard, and full profile covering MERN, Python/Django, and AI research.'
  },
  {
    id: 'projects',
    name: 'Project Laboratory',
    badge: 'WORK',
    icon: 'grid',
    position: [-4.2, 0, 0.2],
    lookAt: [-5.6, 1.8, 0.2],
    description: 'Interactive high-resolution displays showcasing all 9 real production web applications, ML tools, and commercial client deployments.'
  },
  {
    id: 'skills',
    name: 'Technical Skills Wall',
    badge: 'SKILLS',
    icon: 'cpu',
    position: [4.2, 0, 0.2],
    lookAt: [5.6, 1.8, 0.2],
    description: 'Architectural tech wall detailing languages, frameworks, backend architecture, machine learning, and spatial web capabilities.'
  },
  {
    id: 'resume',
    name: 'Credentials & Resume Podium',
    badge: 'RESUME',
    icon: 'award',
    position: [-2.6, 0, 2.6],
    lookAt: [-3.4, 1.4, 3.2],
    description: 'Verified academic collaborations (SKUAST-Kashmir, NIT Srinagar, University of Kashmir), CID Srinagar honors, Google Scholar research, and downloadable CV.'
  },
  {
    id: 'contact',
    name: 'Communications Terminal',
    badge: 'CONNECT',
    icon: 'send',
    position: [2.6, 0, 2.6],
    lookAt: [3.4, 1.4, 3.2],
    description: 'Direct communication terminal: email, phone, regional location in Pulwama, social profiles, and instant message submission.'
  }
];

export const OFFICE_BOUNDS = {
  minX: -5.6,
  maxX: 5.6,
  minZ: -5.2,
  maxZ: 5.2,
  eyeHeight: 1.68
};

// Collision obstacle bounding boxes [minX, maxX, minZ, maxZ, label]
export const OFFICE_OBSTACLES = [
  // Executive Desk & PC Rig
  { minX: -1.7, maxX: 1.7, minZ: -3.8, maxZ: -2.3, name: 'Desk' },
  // Desk Chair
  { minX: -0.6, maxX: 0.6, minZ: -2.2, maxZ: -1.4, name: 'Chair' },
  // Project Display Wall Pedestals (Left)
  { minX: -5.6, maxX: -4.8, minZ: -2.8, maxZ: 2.8, name: 'Projects Wall' },
  // Skills Wall Display Pedestals (Right)
  { minX: 4.8, maxX: 5.6, minZ: -2.8, maxZ: 2.8, name: 'Skills Wall' },
  // Resume Podium (Rear Left)
  { minX: -3.8, maxX: -2.4, minZ: 2.4, maxZ: 3.8, name: 'Resume Station' },
  // Contact Terminal (Rear Right)
  { minX: 2.4, maxX: 3.8, minZ: 2.4, maxZ: 3.8, name: 'Contact Station' },
  // Planters
  { minX: -5.4, maxX: -4.4, minZ: -5.0, maxZ: -4.0, name: 'Planter North-West' },
  { minX: 4.4, maxX: 5.4, minZ: -5.0, maxZ: -4.0, name: 'Planter North-East' },
  { minX: -5.4, maxX: -4.4, minZ: 4.0, maxZ: 5.0, name: 'Planter South-West' },
  { minX: 4.4, maxX: 5.4, minZ: 4.0, maxZ: 5.0, name: 'Planter South-East' }
];
