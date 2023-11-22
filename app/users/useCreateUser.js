import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (userData) => createUserApi(userData),
    onSuccess: (data) => {
      toast.success(`${data.name} you added successfully`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createUser, isPending };
}
