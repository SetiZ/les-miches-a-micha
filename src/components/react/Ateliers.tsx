import ContainerBox from '@/components/react/ContainerBox';
import SocialButton from '@/components/react/SocialButton';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { ToastProvider } from '@/components/react/ToastProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CgMail, CgPhone, CgSmileMouthOpen } from 'react-icons/cg';

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
  title: string;
  subtitle?: string;
  intro?: string;
  workshops?: Workshop[];
  formats?: Format[];
  contactPhone?: string;
  contactEmail?: string;
  outro?: string;
}

export default function AteliersPage({ title, subtitle, intro, workshops, formats, contactPhone, contactEmail, outro }: AteliersPageProps) {
  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <main
        className="m-0 p-0 pt-20 pb-2 px-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div className="w-full">
          <ContainerBox>
            <div className="flex flex-col items-center">
              <img
                src="/miches_blanc.png"
                alt=""
                width={260}
                height={260}
                loading="eager"
              />
              <h1 className="text-3xl font-bold text-center">{title}</h1>
            </div>
            <div className="flex flex-col items-center gap-12 pt-16">
              {subtitle && (
                <h2 className="text-2xl font-bold text-center">{subtitle}</h2>
              )}
              <div className="max-w-[80vw] text-center text-lg">
                {intro}
              </div>
              {workshops && workshops.length > 0 && (
                <div className="max-w-[80vw] text-lg">
                  <h3 className="text-2xl font-bold text-center">
                    Des idées d'ateliers :
                  </h3>
                  <div className="mt-10 grid md:grid-cols-2 gap-x-8 gap-y-10">
                    {workshops.map((workshop: Workshop) => (
                      <div key={workshop.title}>
                        <p className="font-bold text-lg">{workshop.title}</p>
                        <p className="mt-2">{workshop.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {formats && formats.length > 0 && (
                <div className="max-w-[80vw] text-center">
                  <h3 className="text-2xl font-bold text-center">
                    <b>Tarifs :</b>
                  </h3>
                  <div className="flex flex-col items-center gap-8 pt-8">
                    {formats.map((format: Format) => (
                      <div key={format.title}>
                        <p className="font-bold">{format.title}</p>
                        <p className="mt-2">{format.description}</p>
                        <p className="mt-2 italic">{format.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="max-w-[80vw] text-center">
                <h3 className="text-2xl font-bold text-center">
                  <b>Réservez dès maintenant :</b>
                </h3>
                <div className="flex flex-col items-center gap-4 pt-8">
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
                    options={{ download: true }}
                  />
                </div>
              </div>
              {outro && (
                <div className="max-w-[80vw] text-center text-lg">
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
