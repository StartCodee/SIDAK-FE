import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const StatusIndicators = () => {
  return (
    <>
      <div className="w-full mt-8 flex justify-end mb-10">


        <div className="flex gap-4">
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-sm bg-[#76bf70]"></div>
            <p>Surplus</p>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-sm bg-[#f1be5b]"></div>
            <p>Normal</p>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-sm bg-red-500"></div>
            <p>Defisit</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default StatusIndicators;