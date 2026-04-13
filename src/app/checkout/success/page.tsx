import { redirect } from "next/navigation";

export default async function CheckoutSuccessRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const q = session_id ? `?session_id=${encodeURIComponent(session_id)}` : "";
  redirect(`/rental/success${q}`);
}
