import { create } from 'zustand'

type valueType = {

      id?: string,
      title: string,
      type: "CREATE" | "UPDATE"
}

interface IInputTitlteModal {
      isOpen: boolean,
      initialValues: valueType
      onOpen: (type: "CREATE" | "UPDATE", id?: string, title?: string,) => void,
      onClose: () => void
};

const defaultValues: valueType = { id: "", title: "", type: "CREATE" }

export const useInputTitlteModal = create<IInputTitlteModal>((set) => ({
      isOpen: false,
      onOpen: (type, id, title) => set({
            isOpen: true,
            initialValues: { id, title: title || "", type },
      }),
      onClose: () => set({
            isOpen: false,
            initialValues: defaultValues
      }),
      initialValues: defaultValues
}))