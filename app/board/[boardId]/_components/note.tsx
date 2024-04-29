import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { NoteLayer } from "@/types/canvas";
import { Comfortaa } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPoinerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const font = Comfortaa({
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
};

export const Note = ({
  id,
  layer,
  onPoinerDown,
  selectionColor,
}: NoteProps) => {
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
        backgroundColor: fill ? colorToCss(fill):"#000"
      }}
      className="shadow-md drop-shadow-xl"
      x={x}
      y={y}
      width={width}
      height={height}
    >
      <ContentEditable
        html={value || "Текст"}
        onChange={contentChangeHandler}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          color: getContrastingTextColor(fill),
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
