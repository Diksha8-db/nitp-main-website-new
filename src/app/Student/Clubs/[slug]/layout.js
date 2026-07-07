import { notFound } from "next/navigation";
import ClubSidebar from "./ClubSidebar";
import ClubProvider from "./ClubProvider";
import { getClub } from "../services/clubService";

const Layout = async ({ children, params }) => {
  const { slug } = await params;
  const club = await getClub(slug);

  if (!club?.id) notFound();

  return (
    <ClubProvider club={club}>
      <div className="min-h-screen w-full bg-slate-50/40 font-sans antialiased">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] items-start">
            <aside className="w-full md:sticky md:top-6 z-10 shrink-0">
              <ClubSidebar />
            </aside>

            <main className="min-w-0 w-full">
              {children}
            </main>
            
          </div>
        </div>
      </div>
    </ClubProvider>
  );
};

export default Layout;