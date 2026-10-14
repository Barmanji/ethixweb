import ClerkGate from "@/components/clerk-gate";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkGate>{children}</ClerkGate>;
}
