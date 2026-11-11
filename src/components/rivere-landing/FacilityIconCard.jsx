import React from 'react';

const FacilityIconCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-5 text-center">
    <Icon className="h-6 w-6 text-[#1E2B20]" />
    <p className="text-sm font-bold text-[#1E2B20]">{value}</p>
    <p className="text-xs text-[#1E2B20]/60">{label}</p>
  </div>
);

export default FacilityIconCard;
