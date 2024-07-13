import { BookOpen, BookUser, LayoutDashboard, List } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      name: "Posts",
      link: "/admin/posts",
      icon: <BookOpen />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <List />,
    },
    {
      name: "Author",
      link: "/admin/authors",
      icon: <BookUser />,
    },
  ];
  return (
    <section className="w-[200px] border-r h-screen p-3">
      <ul className="w-full flex flex-col gap-2">
        {links.map((item) => {
          return (
            <Link href={item.link}>
              <li className="flex gap-2 items-center bg-gray-200 rounded-lg px-5 py-2">
                <span className="font-semibold text-gray-900">{item.icon}</span>
                <span className="font-semibold text-gray-900">{item.name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
