import NavLInkItem from "./NavLInkItem";

interface INavLinkItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data: INavLinkItem[] = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return (
    <div className="bg-[#FAFCFA] py-2">
      <div className="container mx-auto flex items-center gap-1">
        {data.map((name) => (
          <NavLInkItem key={name.id} slug={name.slug} title={name.nameBn} icon={name.icon} />
        ))}
      </div>
    </div>
  );
};

export default NavLink;
