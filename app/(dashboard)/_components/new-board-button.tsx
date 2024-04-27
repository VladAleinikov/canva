"use client"

import { cn } from "@/lib/utils"
import { useInputTitlteModal } from "@/store/use-rename-modal"
import { Plus } from "lucide-react"

interface NewBoardButtonProps {
      disabled?: boolean
}

export const NewBoardButton = ({ disabled }: NewBoardButtonProps) => {
      const { onOpen } = useInputTitlteModal();
      return (
            <button
                  disabled={disabled}
                  onClick={() => onOpen("CREATE")}
                  className={cn(
                        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center p-6",
                        disabled && "cursor-not-allowed opacity-75 hover:bg-blue-600"
                  )}
            >
                  <div />
                  <Plus className="w-12 h-12 text-white stroke-1" />
                  <p className="text-sm text-white font-light">
                        Новая доска
                  </p>
            </button>
      )
}
