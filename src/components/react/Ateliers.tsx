import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CgMail, CgPhone, CgSmileMouthOpen } from 'react-icons/cg';
import ContainerBox from '@/components/react/ContainerBox';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import SocialButton from '@/components/react/SocialButton';
import { ToastProvider } from '@/components/react/ToastProvider';

interface Workshop {
  title: string;
  description: string;
}
interface Format {
  title: string;
  description: string;
  price: string;
}

interface AteliersPageProps {
  title?: string;
  subtitle?: string;
  intro?: string;
  workshops?: Workshop[];
  formats?: Format[];
  contactPhone?: string;
  contactEmail?: string;
  outro?: string;
}

export default function AteliersPage({
  title,
  subtitle,
  intro,
  workshops,
  formats,
  contactPhone,
  contactEmail,
  outro,
}: AteliersPageProps) {
  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex justify-center">
        <div className="w-full max-w-container-max">
          <div className="text-center mb-12">
            <h1 className="font-headline text-hxl-mobile md:text-hxl text-aged-parchment ember-glow">
              {title}
            </h1>
            <div className="w-24 h-1 bg-fired-gold mx-auto mt-4" />
          </div>
          <ContainerBox>
            <div className="flex flex-col items-center gap-12">
              {subtitle && (
                <h2 className="font-headline text-hlg text-fired-gold text-center">
                  {subtitle}
                </h2>
              )}
              <div className="max-w-3xl text-center font-body text-body-lg text-aged-parchment/80">
                {intro}
              </div>
              {workshops && workshops.length > 0 && (
                <div className="w-full max-w-4xl">
                  <h3 className="font-headline text-hmd text-aged-parchment text-center mb-10">
                    Des idées d'ateliers :
                  </h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                    {workshops.map((workshop: Workshop) => (
                      <div key={workshop.title} className="stone-slab p-6">
                        <p className="font-headline text-hmd text-fired-gold mb-3">
                          {workshop.title}
                        </p>
                        <p className="font-body text-body text-aged-parchment/70">
                          {workshop.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {formats && formats.length > 0 && (
                <div className="w-full max-w-2xl text-center">
                  <h3 className="font-headline text-hmd text-aged-parchment mb-8">
                    Tarifs :
                  </h3>
                  <div className="grid gap-6">
                    {formats.map((format: Format) => (
                      <div key={format.title} className="stone-slab p-6">
                        <p className="font-headline text-hmd text-fired-gold">
                          {format.title}
                        </p>
                        <p className="font-body text-body text-aged-parchment/70 mt-2">
                          {format.description}
                        </p>
                        <p className="font-body text-body-lg italic text-aged-parchment/60 mt-2">
                          {format.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-full max-w-2xl text-center">
                <h3 className="font-headline text-hmd text-aged-parchment mb-8">
                  Réservez dès maintenant :
                </h3>
                <div className="flex flex-col items-center gap-4">
                  <SocialButton
                    text={`appelez au ${contactPhone}`}
                    link={`tel:${contactPhone?.replace(/[^0-9]/g, '')}`}
                    icon={<CgPhone />}
                  />
                  <SocialButton
                    text={`écrivez-nous à ${contactEmail}`}
                    link={`mailto:${contactEmail}`}
                    icon={<CgMail />}
                  />
                  <SocialButton
                    text="Téléchargez notre carte ateliers"
                    link="Ateliers_boulanj.pdf"
                    icon={<CgSmileMouthOpen />}
                    download
                  />
                </div>
              </div>
              {outro && (
                <div className="max-w-3xl text-center font-body text-body-lg text-aged-parchment/80">
                  {outro}
                </div>
              )}
            </div>
          </ContainerBox>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
