import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { TextLayer } from "@/types/canvas";
import { Comfortaa } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPoinerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const font = Comfortaa({
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
};

export const Text = ({
  id,
  layer,
  onPoinerDown,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);
  const contentChangeHandler = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }
  return (
    <foreignObject
      onPointerDown={(e) => onPoinerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      x={x}
      y={y}
      width={width}
      height={height}
    >
      <ContentEditable
        html={value || "Текст"}
        onChange={contentChangeHandler}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
