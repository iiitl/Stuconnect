import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger 
} from "@/components/ui/tooltip"

interface ActionTooltipProps{
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

const ActionTooltip = ({
    label,
    children,
    side,
    align
}: ActionTooltipProps) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip delayDuration={25}>
            <TooltipTrigger asChild>
            {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p className="font-semibold text-sm capitalize">
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ActionTooltip
