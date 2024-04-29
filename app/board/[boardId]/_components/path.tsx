import { colorToCss, getSvgPathFromStroke } from "@/lib/utils";
import { Color } from "@/types/canvas";
import {getStroke} from 'perfect-freehand'

interface PathProps {
  x: number;
  y: number;
  points: number[][];
  fill: Color;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

export const Path = ({x,y,points, fill, onPointerDown, stroke }: PathProps) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5, 
          smoothing: 0.5,
          streamline: 0.5
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      strokeWidth={1}
      fill={colorToCss(fill)}
      stroke={stroke}
    />
  );
};
