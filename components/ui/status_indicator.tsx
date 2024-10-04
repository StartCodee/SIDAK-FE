import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const StatusIndicators = () => {
  return (
    <>
    <div className="w-full mt-5 flex justify-end mb-10">
    <TooltipProvider >
        <div className="flex gap-1">
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-[#76bf70]"></TooltipTrigger>
            <p>Surplus</p>
            <TooltipContent>
            <p>Surplus</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-[#f1be5b]"></TooltipTrigger>
            <p>Normal</p>
            <TooltipContent>
            <p>Normal</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger className="w-[24px] h-[24px] bg-red-500"></TooltipTrigger>
            <p>Deficit</p>
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