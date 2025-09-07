import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CorreoConfirmado() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white" data-theme="emerald">
      <Head>
        <title>Correo confirmado | EvoltFit</title>
        <meta name="description" content="Tu correo ha sido confirmado exitosamente. Ahora puedes iniciar sesión en EvoltFit." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-6">
        <section className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-8 md:p-12 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">¡Tu correo ha sido confirmado!</h1>
            <p className="mt-3 text-gray-600 text-base md:text-lg">
              Ya puedes iniciar sesión para comenzar a usar <span className="text-blue-600 font-semibold">EvoltFit</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                Iniciar sesión
              </Link>
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Registra tu progreso</h3>
            <p className="mt-2 text-gray-600 text-sm">Lleva control de tus entrenamientos y medidas para ver tu evolución.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Herramientas útiles</h3>
            <p className="mt-2 text-gray-600 text-sm">Calculadoras y funciones pensadas para ayudarte a mejorar.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Comienza ahora</h3>
            <p className="mt-2 text-gray-600 text-sm">Inicia sesión y empieza tu camino fitness con EvoltFit.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
