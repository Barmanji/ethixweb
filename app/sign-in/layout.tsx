import ClerkGate from "@/components/clerk-gate";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkGate>{children}</ClerkGate>;
}
