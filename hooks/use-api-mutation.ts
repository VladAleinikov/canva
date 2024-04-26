import { useMutation } from "convex/react";
import { useState } from "react"

export const useApiMutation = (mutationFunc: any) => {
      const [pending, setPending] = useState<boolean>(false);
      const apiMutation = useMutation(mutationFunc);

      const mutate = (payload: any) => {
            setPending(true);
            return apiMutation(payload)
                  .finally(() => setPending(false))
                  .then((res) => {
                        return res
                  })
                  .catch((error) => {
                        throw error
                  })
      }

      return { mutate, pending };
}