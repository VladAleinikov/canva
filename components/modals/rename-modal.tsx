"use client"

import { useRenameModal } from "@/store/use-rename-modal"
import {
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,

} from "../ui/dialog"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"


export const RenameModal = () => {
      const { mutate, pending } = useApiMutation(api.board.update)
      const {
            isOpen,
            onClose,
            initialValues
      } = useRenameModal();
      const [title, setTitle] = useState<string>(initialValues.title)

      useEffect(() => {
            setTitle(initialValues.title);
      }, [initialValues.title])

      const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();

            mutate({
                  id: initialValues.id,
                  title
            })
                  .then(() => {
                        toast.success("Доска переименована")
                        onClose();
                  })
                  .catch(() => (toast.error("Не получилось переименовать")))
      }

      return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                  <DialogContent>
                        <DialogHeader>
                              <DialogTitle>
                                    Изменить заголовок доски
                              </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                              Введите новый заголовк для этой доски
                        </DialogDescription>
                        <form
                              onSubmit={onSubmit}
                              className="space-y-4"
                        >
                              <Input
                                    disabled={pending}
                                    required
                                    maxLength={60}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Заголовок доски"
                              />
                              <DialogFooter>
                                    <DialogClose asChild>
                                          <Button
                                                type="button"
                                                variant="outline"
                                          >
                                                Отмена
                                          </Button>
                                    </DialogClose>
                                    <Button
                                          disabled={pending}
                                          type="submit"
                                    >
                                          Сохранить
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      )
}
