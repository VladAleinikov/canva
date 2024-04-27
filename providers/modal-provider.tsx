"use client"

import { InputTitleModal } from "@/components/modals/input-title-modal"
import { useEffect, useState } from "react"


export const ModalProvider = () => {
      const [isMounted, setIsMounted] = useState<boolean>(false);

      useEffect(() => {
            setIsMounted(true);
      }, [])
      if (!isMounted) {
            return null;
      }
      return (
            <>
                  <InputTitleModal />
            </>
      )
}
