import ContainerBox from '@/components/react/ContainerBox';
import SocialButton from '@/components/react/SocialButton';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { ToastProvider } from '@/components/react/ToastProvider';
import trusted from '@/data/trusted.json';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

interface HomePageProps {
  title: string;
  tagline?: string;
  introHtml?: string;
}


export default function HomePage({ title, tagline, introHtml }: HomePageProps) {
  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-16 overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface z-10" />
        </div>
        <div className="relative z-20 max-w-4xl text-center space-y-8">
          <div className="flex justify-center mb-4">
            <img src="/miches_blanc.png" alt="M" className="w-64 h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse invert" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-ember-orange/30 bg-ember-orange/10 status-pulse">
            <span className="w-2 h-2 rounded-full bg-ember-orange shadow-[0_0_8px_#E65100]" />
            <span className="font-label text-[10px] text-ember-orange tracking-[0.1em] uppercase font-bold">Le fournil est ouvert !</span>
          </div>
          <h1 className="font-headline text-hxl-mobile md:text-hxl text-aged-parchment ember-glow leading-none">
            Micro-fournil artisanal
          </h1>
          <p className="font-headline text-hmd italic text-primary-fixed-dim/80 max-w-2xl mx-auto">
            &ldquo;{tagline}&rdquo;
          </p>
          <div className="separator" />
          <p className="font-body text-body-lg text-aged-parchment/90 max-w-3xl mx-auto">
            <span dangerouslySetInnerHTML={{ __html: introHtml || '' }} />
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <a href="/carte" className="forged-btn-primary px-8 py-4 font-label text-label tracking-[0.1em] flex items-center gap-2 uppercase">
              COMMANDER EN LIGNE
              <span className="text-sm">&rarr;</span>
            </a>
            <a href="/les-miches-a-micha.pdf" download className="forged-btn px-8 py-4 font-label text-label tracking-[0.1em] uppercase text-aged-parchment">
              T&Eacute;L&Eacute;CHARGER LE MENU
            </a>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Workshops Card */}
            <div className="stone-slab md:col-span-2 p-12 flex flex-col text-center justify-between">
              {/* <div> */}
                <h2 className="font-headline text-hlg text-fired-gold mb-6">LES ATELIERS BOULANJ&apos;</h2>
                <p className="text-body-lg text-primary-fixed-dim max-w-xl mb-8">
                  Apprenez l&apos;art du pain au levain, la manipulation des farines anciennes et les secrets d&apos;une fermentation lente. Une immersion totale dans notre univers artisanal.
                </p>

              <a href="/ateliers" className="forged-btn w-full py-4 font-label text-label uppercase text-aged-parchment">En savoir plus</a>
            </div>
            {/* Flour Card */}
            <div className="stone-slab p-12 flex flex-col items-center text-center justify-center">
              <span className="text-5xl text-fired-gold mb-6">&#x1F33E;</span>
              <h2 className="font-headline text-hmd text-aged-parchment mb-4">VENTE DE FARINES</h2>
              <p className="font-body text-body text-primary-fixed-dim/70 mb-8">
                Matières premières bio, locales et nobles sélectionnées avec soin pour vos créations personnelles.
              </p>
              <a href="/carte_des_farines.pdf" className="forged-btn w-full py-4 font-label text-label uppercase text-aged-parchment">Catalogue farines</a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-margin-mobile md:px-margin-desktop py-24">
        <div className="max-w-container-max mx-auto text-center mb-16">
          <h3 className="font-label text-label text-fired-gold tracking-[0.3em] uppercase mb-4">La Communauté</h3>
          <h2 className="font-headline text-hlg text-aged-parchment">Ils nous font confiance</h2>
          <div className="w-24 h-1 bg-fired-gold mx-auto mt-6" />
        </div>
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 opacity-80">
          {trusted.trusted.map((trust: { id: number; title?: string; url?: string; description?: string; order?: string }) => (
            <div key={trust.id} className="text-center p-4 stone-slab hover:border-fired-gold transition-colors duration-500">
              {trust.order === 'pre' ? (
                <>
                  {trust.url ? (
                    <a href={trust.url} target="_blank" rel="noopener noreferrer" className="font-body text-body font-medium text-aged-parchment hover:text-fired-gold transition-colors">{trust.title}</a>
                  ) : (
                    <span className="font-body text-body font-medium text-aged-parchment">{trust.title}</span>
                  )}
                  {trust.description && <span className="font-label text-[10px] text-primary-fixed-dim block mt-2 uppercase tracking-[0.1em]">{trust.description}</span>}
                </>
              ) : trust.order === 'post' ? (
                <>
                  <span className="font-label text-[10px] text-primary-fixed-dim block mb-2 uppercase tracking-[0.1em">{trust.description}</span>
                  {trust.url ? (
                    <a href={trust.url} target="_blank" rel="noopener noreferrer" className="font-body text-body font-medium text-aged-parchment hover:text-fired-gold transition-colors">{trust.title}</a>
                  ) : (
                    <span className="font-body text-body font-medium text-aged-parchment">{trust.title}</span>
                  )}
                </>
              ) : (
                <>
                  {trust.url ? (
                    <a href={trust.url} target="_blank" rel="noopener noreferrer" className="font-body text-body font-medium text-aged-parchment hover:text-fired-gold transition-colors">{trust.title}</a>
                  ) : trust.title ? (
                    <span className="font-body text-body font-medium text-aged-parchment">{trust.title}</span>
                  ) : (
                    <span className="font-label text-[10px] text-primary-fixed-dim uppercase tracking-[0.1em]">{trust.description}</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-margin-mobile md:px-margin-desktop py-24 bg-surface-container-high border-y border-iron-rim">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-hlg text-aged-parchment mb-4 uppercase">PRÊT À GOÛTER L&apos;AUTHENTIQUE ?</h2>
          <p className="font-body text-body-lg text-primary-fixed-dim mb-12">
            Plus d&rsquo;informations ou pour passer commande directement par téléphone ou email.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12">
            <a href="tel:+33652394879" className="stone-slab p-8 flex items-center justify-center gap-4">
              <span className="font-headline text-hmd text-aged-parchment">06.52.39.48.79</span>
            </a>
            <a href="mailto:lesmichesamicha@gmail.com" className="stone-slab p-8 flex items-center justify-center gap-4">
              <span className="font-body text-body-lg font-medium text-aged-parchment">lesmichesamicha@gmail.com</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://www.instagram.com/lesmichesamicha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-label text-aged-parchment/60 hover:text-ember-orange transition-all uppercase tracking-[0.1em]">
              INSTAGRAM
            </a>
            <a href="https://g.page/r/CQP-U6UnJ-McEB0/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-label text-label text-aged-parchment/60 hover:text-ember-orange transition-all uppercase tracking-[0.1em]">
              AVIS GOOGLE
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </ToastProvider>
  );
}
