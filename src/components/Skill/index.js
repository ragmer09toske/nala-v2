import React from 'react';

export const Skill = ({ skill }) => {
  const truncatedSkill = skill.length > 20 ? skill.slice(0, 20) + '...' : skill;

  return (
    <div>
      <div className="Skills" style={{ fontSize: '9px', marginTop: 15 }}>
        {truncatedSkill}
      </div>
    </div>
  );
};
