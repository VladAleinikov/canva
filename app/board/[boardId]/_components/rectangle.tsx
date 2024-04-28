import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas"

interface Rectanglerops {
      id: string,
      layer: RectangleLayer,
      onPoinerDown: (e: React.PointerEvent, id: string) => void,
      selectionColor?: string
}

export const Rectangle = ({
      id,
      layer,
      onPoinerDown,
      selectionColor
}: Rectanglerops) => {
      const { x, y, width, height, fill } = layer;
      return (
            <rect
                  className="drop-shadow-md"
                  onPointerDown={(e) => onPoinerDown(e, id)}
                  style={{
                        transform: `translate(${x}px, ${y}px)`
                  }}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  strokeWidth={1}
                  fill={colorToCss(fill)}
                  stroke={selectionColor || "transparent"}
            />
      )
}
