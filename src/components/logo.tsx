import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src="logo.svg" alt="Finance Neon" height={24} width={24} />
      <p className="text-lg">Finances Neon</p>
    </div>
  );
};
