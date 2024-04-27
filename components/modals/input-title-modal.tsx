"use client"

import { useInputTitlteModal } from "@/store/use-rename-modal"
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
import { useOrganization } from "@clerk/nextjs"

export const InputTitleModal = () => {
      const { organization} = useOrganization();
      const { mutate: mutateRename, pending: pendingRename } = useApiMutation(api.board.update)
      const { mutate: mutateCreate, pending: pendingCreate } = useApiMutation(api.board.create)
      const {
            isOpen,
            onClose,
            initialValues,
      } = useInputTitlteModal();
      const [title, setTitle] = useState<string>(initialValues.title)

      useEffect(() => {
            setTitle(initialValues.title);
      }, [initialValues.title])

      const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();

            if (initialValues.type === "CREATE") {
                  mutateCreate({
                        orgId: organization?.id,
                        title
                  })
                        .then(() => {
                              toast.success("Доска создана")
                              onClose();
                        })
                        .catch(() => (toast.error("Не получилось создать")))
            } else {
                  mutateRename({
                        id: initialValues.id,
                        title
                  })
                        .then(() => {
                              toast.success("Доска переименована")
                              onClose();
                        })
                        .catch(() => (toast.error("Не получилось переименовать")))
            }
      }

      return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                  <DialogContent>
                        <DialogHeader>
                              <DialogTitle>
                                    {initialValues.type === "CREATE" ? "Создать новую доску" : "Изменить заголовок доски"}
                              </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                              Введите заголовк для этой доски
                        </DialogDescription>
                        <form
                              onSubmit={onSubmit}
                              className="space-y-4"
                        >
                              <Input
                                    disabled={pendingRename || pendingCreate}
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
                                          disabled={pendingRename || pendingCreate}
                                          type="submit"
                                    >
                                          {initialValues.type === "CREATE" ? "Создать" : "Сохранить"}
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      )
}
