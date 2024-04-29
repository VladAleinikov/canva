import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPoinerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse = ({
  id,
  layer,
  onPoinerDown,
  selectionColor,
}: EllipseProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPoinerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      width={width}
      height={height}
      strokeWidth={1}
      fill={colorToCss(fill)}
      stroke={selectionColor || "transparent"}
    />
  );
};