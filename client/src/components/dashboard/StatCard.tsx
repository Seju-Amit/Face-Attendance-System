import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: number;
  trendDirection?: "up" | "down";
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendDirection,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("stats-card card-hover", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline mt-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend !== undefined && (
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  trendDirection === "up" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                )}
              >
                {trendDirection === "up" ? "+" : "-"}
                {trend}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-md text-primary dark:text-primary-foreground">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
