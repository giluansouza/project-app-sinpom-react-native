import axios from "@/utils/axios";
import { getToken, setToken } from "./token-service";

export async function getLogin(credentials: {
  email: string;
  password: string;
  device_name: string;
}) {
  const { data }: { data: { token: string } } = await axios.post(
    "/login",
    credentials
  );
  await setToken(data.token);
}

export async function loadUser() {
  const token = await getToken();

  const { data } = await axios.get<{ user: any }>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
}
