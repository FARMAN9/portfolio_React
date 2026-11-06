import RoomArchitecture from './RoomArchitecture';
import Lighting from './Lighting';
import Workstation from './Workstation';
import ProjectLabStation from '../stations/ProjectLabStation';
import SkillsWallStation from '../stations/SkillsWallStation';
import ResumeStation from '../stations/ResumeStation';
import ContactStation from '../stations/ContactStation';
import WelcomeStation from '../stations/WelcomeStation';
import Decorations from './Decorations';

/* eslint-disable react/prop-types */
export default function OfficeWorld({
  onSelectStation,
  onSelectProject,
  onSelectSkill
}) {
  return (
    <group name="OfficeWorld">
      {/* 1. Architectural Structure */}
      <RoomArchitecture />

      {/* 2. Photorealistic Lighting */}
      <Lighting />

      {/* 3. Executive Workstation (Dual Monitors, PC, Chair) */}
      <Workstation onInspect={() => onSelectStation('workstation')} />

      {/* 4. Project Laboratory Display Wall */}
      <ProjectLabStation onSelectProject={onSelectProject} />

      {/* 5. Technical Skills Wall */}
      <SkillsWallStation onSelectSkill={onSelectSkill} />

      {/* 6. Credentials & Resume Station Podium */}
      <ResumeStation onInspect={() => onSelectStation('resume')} />

      {/* 7. Communications Terminal */}
      <ContactStation onInspect={() => onSelectStation('contact')} />

      {/* 8. Welcome Area Monolith */}
      <WelcomeStation onInspect={() => onSelectStation('welcome')} />

      {/* 9. Indoor Architectural Plants & Decor */}
      <Decorations />
    </group>
  );
}
