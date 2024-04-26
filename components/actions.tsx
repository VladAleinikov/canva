"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "./confirm-modal"
import { Button } from "./ui/button"
import { useRenameModal } from "@/store/use-rename-modal"

interface ActionProps {
      children: React.ReactNode,
      side?: DropdownMenuContentProps["side"],
      sideOffset?: DropdownMenuContentProps["sideOffset"],
      id: string,
      title: string
}

export const Actions = ({
      children,
      side,
      sideOffset,
      id,
      title
}: ActionProps) => {
      const { onOpen} = useRenameModal();

      const { mutate, pending } = useApiMutation(api.board.remove)
      const onCopyLink = () => {
            navigator.clipboard
                  .writeText(`${window.location.origin}/board/${id}`)
                  .then(() => toast.success("Ссылка скопирована!"))
                  .catch(() => toast.error("Не удалось скопировать"))
      }
      const onDelete = () => {
            mutate({ id })
                  .then(() => toast.success("Доска удалена!"))
                  .catch(() => toast.error("Не удалось удалить"))
      }
      return (
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        {children}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                        side={side}
                        sideOffset={sideOffset}
                        className="w-60"
                        onClick={(e) => e.stopPropagation()}
                  >
                        <DropdownMenuItem
                              onClick={onCopyLink}
                              className="p-3 cursor-pointer"
                        >
                              <Link2 className="h-4 w-4 mr-2" />
                              Копировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem
                              onClick={() => onOpen(id, title)}
                              className="p-3 cursor-pointer"
                        >
                              <Pencil className="h-4 w-4 mr-2" />
                              Переименовать
                        </DropdownMenuItem>
                        <ConfirmModal
                              header="Удалить доску?"
                              description="Это удалит доску и всё что внитри."
                              disabled={pending}
                              onConfirm={onDelete}
                        >
                              <Button
                                    variant="ghost"
                                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal rounded-sm"
                              >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Удалить
                              </Button>
                        </ConfirmModal>
                  </DropdownMenuContent>
            </DropdownMenu>
      )
}
