"use client";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/apiUsers";

export function useUser() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, isLoading };
}
