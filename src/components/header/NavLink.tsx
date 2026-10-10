import NavLInkItem from "./NavLInkItem";

interface INavLinkItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: INavLinkItem[] = await res.json();

  return (
    <div className="overflow-x-auto py-2 bg-[#FAFCFA] scrollbar-none [&::-webkit-scrollbar]:hidden lg:overflow-visible">
      <div className="container px-2 mx-auto flex w-max items-center gap-1 whitespace-nowrap lg:w-auto">
        {data.map((name) => (
          <NavLInkItem key={name.id} slug={name.slug} title={name.nameBn} icon={name.icon} />
        ))}
      </div>
    </div>
  );
};

export default NavLink;
