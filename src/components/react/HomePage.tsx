import ContainerBox from '@/components/react/ContainerBox';
import SocialButton from '@/components/react/SocialButton';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { ToastProvider } from '@/components/react/ToastProvider';
import trusted from '@/data/trusted.json';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
  CgBrowse,
  CgInstagram,
  CgPin,
  CgSmileMouthOpen,
  CgSoftwareDownload,
} from 'react-icons/cg';

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
      <main
        className="m-0 p-0 pt-20 pb-2 px-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div
          className="w-full"
          style={{
            background: 'linear-gradient(to bottom, #b7791f 0%, #f6ad55 25%, rgba(255,255,255,0.3) 50%)',
          }}
        >
          <ContainerBox>
            <div className="flex justify-center">
              <img
                src="/miches_blanc.png"
                alt=""
                width={260}
                height={260}
                loading="eager"
              />
            </div>
            <h2 className="text-3xl font-bold text-center">{title}</h2>
            <p className="text-center text-xl">
              {tagline?.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <div className="flex flex-col items-center gap-12 pt-16">
              <div className="max-w-[80vw] text-center text-lg">
                <span dangerouslySetInnerHTML={{ __html: introHtml || '' }} />
              </div>
              <div className="max-w-[80vw] text-center">
                <h3 className="text-2xl font-bold text-center">Retrouvez notre carte</h3>
                <div className="flex flex-col items-center gap-4 pt-8">
                  <SocialButton
                    text="Commander en ligne"
                    link="/carte"
                    icon={<CgBrowse />}
                    options={{ in: true }}
                  />
                  <SocialButton
                    text="Télécharger le menu"
                    link="les-miches-a-micha.pdf"
                    icon={<CgSoftwareDownload />}
                    options={{ download: true }}
                  />
                  <SocialButton
                    text="Vente de farines"
                    link="Carte_des_farines.pdf"
                    icon={<CgSoftwareDownload />}
                    options={{ in: true }}
                  />
                  <SocialButton
                    text="Les ateliers"
                    link="/ateliers"
                    icon={<CgSmileMouthOpen />}
                    options={{ in: true }}
                  />
                  <SocialButton
                    text="Télécharger la carte ateliers"
                    link="Ateliers_boulanj.pdf"
                    icon={<CgSoftwareDownload />}
                    options={{ download: true }}
                  />
                </div>
              </div>
              <div className="max-w-[80vw] text-center">
                <h3 className="text-2xl font-bold text-center">Ils nous font confiance</h3>
                {trusted && (
                  <div className="flex flex-wrap justify-center gap-[30px] pt-8">
                    {trusted.trusted.map((trust: { id: number; title?: string; url?: string; description?: string; order?: string }) => (
                      <div key={trust.id} className="w-[200px]">
                        {trust.order === 'pre' ? (
                          <>
                            <a href={trust.url} target="_blank" rel="noopener noreferrer" className="underline">
                              {trust.title}
                            </a>
                            , {trust.description}
                          </>
                        ) : (
                          <>
                            {trust.description}{' '}
                            {trust.url && (
                              <a href={trust.url} target="_blank" rel="noopener noreferrer" className="underline">
                                {trust.title}
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="max-w-[80vw] text-center">
                <h3 className="text-lg font-bold text-center">
                  Plus d&rsquo;informations ou pour passer commande
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                  <a href="tel:+33652394879" className="link">06.52.39.48.79</a>
                  <a href="mailto:lesmichesamicha@gmail.com" className="link">
                    lesmichesamicha@gmail.com
                  </a>
                </div>
                <div className="flex flex-col items-center gap-4 pt-8">
                  <SocialButton
                    text="S'abonner à Instagram"
                    link="https://www.instagram.com/lesmichesamicha/"
                    icon={<CgInstagram />}
                  />
                  <SocialButton
                    text="Laisser un avis sur Google Maps"
                    link="https://g.page/r/CQP-U6UnJ-McEB0/review"
                    icon={<CgPin />}
                  />
                </div>
              </div>
            </div>
          </ContainerBox>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
