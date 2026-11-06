import RoomArchitecture from './RoomArchitecture';
import Lighting from './Lighting';
import Workstation from './Workstation';
import BotanicalCredenza from './BotanicalCredenza';
import HangingPlanters from './HangingPlanters';
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
      {/* 1. Architectural Structure (Hardwood floor, Venetian walls, panoramic glass) */}
      <RoomArchitecture />

      {/* 2. Photorealistic Image-Based Lighting & Sunbeams */}
      <Lighting />

      {/* 3. Executive Workstation (Dual curved monitors, Scandinavian desk, ergonomic chair with headrest, Persian rug) */}
      <Workstation onInspect={() => onSelectStation('workstation')} />

      {/* 4. Overhead Biophilic Suspended Gantry & Cascading Greenery (Reference Photo 4 & 5) */}
      <HangingPlanters position={[0, 3.4, -2.8]} />

      {/* 5. Modern Slatted Wood Credenza with Botanical Plants (Reference Photo 3) */}
      <BotanicalCredenza position={[-2.4, 0, 4.6]} rotation={[0, Math.PI, 0]} />

      {/* 6. Project Laboratory Display Wall */}
      <ProjectLabStation onSelectProject={onSelectProject} />

      {/* 7. Technical Skills Wall */}
      <SkillsWallStation onSelectSkill={onSelectSkill} />

      {/* 8. Credentials & Resume Station Podium */}
      <ResumeStation onInspect={() => onSelectStation('resume')} />

      {/* 9. Communications Terminal */}
      <ContactStation onInspect={() => onSelectStation('contact')} />

      {/* 10. Welcome Area Monolith */}
      <WelcomeStation onInspect={() => onSelectStation('welcome')} />

      {/* 11. Indoor Architectural Plants, Executive Lounge & Decor */}
      <Decorations />
    </group>
  );
}
