import Header from "../components/Header";

function HomeView() {
    return (
        <>
            <Header />
            <main className="bg-gray-100 min-h-screen py-10 bg-no-repeat bg-right-top lg:bg-home lg:bg-[size:50%]">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todas tus{" "}
                            <span className="text-cyan-400">
                                Redes Sociales{" "}
                            </span>{" "}
                            en un enlace
                        </h1>
                        <p className="text-slate-800">
                            Únete a mas de 200 mil desarrolladores que ya usan
                            DevTree para compartir su perfil de Github, Tiktok,
                            Facebook, Youtube, Tiwtch, Instagram y más
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default HomeView;
