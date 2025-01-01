import { SignOutButton } from "@/features/authenticateUser";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        Header
        <SignOutButton />
      </header>
      <main>{children}</main>
    </>
  );
}
