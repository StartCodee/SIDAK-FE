import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const StatusIndicators = () => {
  return (
    <>
    <div className="w-full mt-3 flex justify-end mb-10">
    <TooltipProvider >
        <div className="flex gap-1">
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-[#76bf70]"></TooltipTrigger>
            <TooltipContent>
            <p>Surplus</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-[#f1be5b]"></TooltipTrigger>
            <TooltipContent>
            <p>Normal</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-red-500"></TooltipTrigger>
            <TooltipContent>
            <p>Deficit</p>
            </TooltipContent>
        </Tooltip>
        </div>
    </TooltipProvider>
    </div>

    </>
  );
};

export default StatusIndicators;