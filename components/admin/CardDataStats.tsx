import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  bg: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  bg,
  children,
}) => {
  return (
    <div className={`flex-1 rounded-lg border border-stroke px-7.5 py-6 shadow-default text-white`} style={{'background':bg}}>
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-white dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

      </div>
    </div>
  );
};

export default CardDataStats;
