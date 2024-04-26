"use client"

import {
      AlertDialog,
      AlertDialogTrigger,
      AlertDialogContent,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogCancel,
      AlertDialogAction
 } from "./ui/alert-dialog"

interface ConfirmModalProps{
      children: React.ReactNode,
      onConfirm: () => void,
      disabled?: boolean,
      header: string,
      description?: string
}

export const ConfirmModal = ({ 
      children,
      onConfirm,
      disabled,
      header,
      description
}: ConfirmModalProps) => {
      const confirmHandler = () => {
            onConfirm();
      }
  return (
        <AlertDialog>
              <AlertDialogTrigger asChild>
                    {children}
              </AlertDialogTrigger>
              <AlertDialogContent>
                    <AlertDialogHeader>
                          <AlertDialogTitle>
                                {header}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                                {description}
                          </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                                disabled={disabled}
                                onClick={confirmHandler}
                          >
                                Подтвердить
                          </AlertDialogAction>
                    </AlertDialogFooter>
              </AlertDialogContent>
    </AlertDialog>
  )
}
