import { fr } from 'date-fns/locale';
import { type SubmitEvent, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import {
  CgAdd,
  CgCalendarDates,
  CgInfo,
  CgMail,
  CgPhone,
  CgPin,
  CgRemove,
} from 'react-icons/cg';
import { useToast } from '@/components/react/ToastProvider';
import { useCartStore } from '@/utils/store';
import 'react-day-picker/style.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  { value: 'matin', label: 'Matinée' },
  { value: 'aprem', label: 'Après-midi' },
  { value: 'soir', label: 'Soirée' },
] as const;

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>(
    'pickup',
  );
  const [address, setAddress] = useState('');
  const { cart, total, count, add, remove, removeAll } = useCartStore();
  const toast = useToast();

  async function sendOrder(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const data = {
        name: formData.get('nom'),
        phoneNumber: formData.get('tel'),
        email: formData.get('email'),
        date: selectedDate
          ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
          : '',
        timeSlot: formData.get('timeSlot'),
        deliveryMode,
        address: deliveryMode === 'delivery' ? address : '',
        comment: formData.get('comment'),
        total: total(),
        cart: cart,
      };
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.id) {
        toast({
          title: 'Commande envoyée !',
          description: 'Vous allez bientôt recevoir un email de confirmation',
          status: 'success',
        });
        removeAll();
        onClose();
      } else {
        toast({
          title: 'Erreur',
          description: result.error || 'Une erreur est survenue.',
          status: 'error',
        });
      }
    } catch {
      toast({
        title: 'Erreur',
        description: "Impossible d'envoyer la commande.",
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fermer le panier"
          className="fixed inset-0 z-40"
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') onClose();
          }}>
          <div className="absolute inset-0 bg-black/60" />
        </button>
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-surface border-l-2 border-iron-rim shadow-2xl text-aged-parchment transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex items-center justify-between p-4 border-b border-iron-rim">
          <h2 className="font-headline text-hmd text-fired-gold">Panier</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-aged-parchment hover:text-fired-gold transition-colors">
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)] space-y-6">
          {count() === 0 ? (
            <div className="text-center py-8 text-aged-parchment/50 font-headline">
              Panier vide
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border border-iron-rim p-3">
                  <span className="flex-1 font-body">{item.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-1 text-aged-parchment/70 hover:text-fired-gold"
                      onClick={() => remove(item.id)}
                      aria-label="minus">
                      <CgRemove className="size-3" />
                    </button>
                    <span className="font-label text-sm w-6 text-center">
                      {item.count}
                    </span>
                    <button
                      type="button"
                      className="p-1 text-aged-parchment/70 hover:text-fired-gold"
                      onClick={() => add(item)}
                      aria-label="add">
                      <CgAdd className="size-3" />
                    </button>
                  </div>
                  <span className="font-headline text-fired-gold w-20 text-right">
                    {(item.price * item.count).toFixed(2)} €
                  </span>
                </div>
              ))}
              <p className="font-headline text-right text-fired-gold text-hmd">
                Total: {total().toFixed(2)} €
              </p>
              <p className="font-body text-sm text-aged-parchment/50">
                Ce total est donné à titre indicatif, en fonction de la
                personnalisation de vos produits notamment. Des frais de
                livraison pourront être ajoutés le cas échéant.
              </p>
            </div>
          )}

          <div className="separator" />

          <form onSubmit={sendOrder} className="space-y-4">
            <h3 className="font-headline text-hmd text-aged-parchment">
              Veuillez entrer vos informations
            </h3>
            <p className="font-body text-sm text-aged-parchment/70">
              Un email vous sera envoyé par la suite pour confirmer votre
              commande.
            </p>

            <label className="flex items-center gap-2 border border-iron-rim p-3">
              <CgInfo className="text-iron-rim size-5 shrink-0" />
              <input
                type="text"
                placeholder="nom"
                name="nom"
                className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
                required
              />
            </label>
            <label className="flex items-center gap-2 border border-iron-rim p-3">
              <CgPhone className="text-iron-rim size-5 shrink-0" />
              <input
                type="tel"
                name="tel"
                placeholder="numéro de téléphone"
                className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
                required
              />
            </label>
            <label className="flex items-center gap-2 border border-iron-rim p-3">
              <CgMail className="text-iron-rim size-5 shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="email"
                className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
                required
              />
            </label>
            <div className="flex items-center gap-2 border border-iron-rim p-1">
              <button
                type="button"
                className={`flex-1 py-2 font-label text-sm tracking-widest uppercase transition-colors ${
                  deliveryMode === 'pickup'
                    ? 'bg-fired-gold text-surface'
                    : 'text-aged-parchment/70 hover:text-aged-parchment'
                }`}
                onClick={() => setDeliveryMode('pickup')}>
                En magasin
              </button>
              <button
                type="button"
                className={`flex-1 py-2 font-label text-sm tracking-widest uppercase transition-colors ${
                  deliveryMode === 'delivery'
                    ? 'bg-fired-gold text-surface'
                    : 'text-aged-parchment/70 hover:text-aged-parchment'
                }`}
                onClick={() => setDeliveryMode('delivery')}>
                Livraison
              </button>
            </div>
            {deliveryMode === 'delivery' && (
              <label className="flex items-center gap-2 border border-iron-rim p-3">
                <CgPin className="text-iron-rim size-5 shrink-0" />
                <input
                  type="text"
                  name="address"
                  placeholder="adresse de livraison"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
                  required
                />
              </label>
            )}
            <p className="font-body text-sm text-aged-parchment/70">
              Veuillez spécifier le créneau de livraison souhaité - comptez un
              minimum de 12h pour laisser au boulanger le temps de faire votre
              pain !
            </p>
            <label className="flex items-center gap-2 border border-iron-rim p-3">
              <CgCalendarDates className="text-iron-rim size-5 shrink-0" />
              <button
                type="button"
                popoverTarget="rdp-popover"
                className="bg-transparent text-aged-parchment w-full text-left font-body"
                style={{ anchorName: '--rdp' } as React.CSSProperties}>
                {selectedDate
                  ? selectedDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Choisir une date'}
              </button>
            </label>
            <div
              popover="auto"
              id="rdp-popover"
              className="relative"
              style={{ positionAnchor: '--rdp' } as React.CSSProperties}>
              <DayPicker
                className="react-day-picker"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={fr}
                disabled={{ before: new Date() }}
              />
            </div>
            <select
              name="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="bg-transparent text-aged-parchment border border-iron-rim p-3 w-full outline-none font-body"
              required>
              <option value="" disabled>
                Choisir un créneau
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            <textarea
              name="comment"
              placeholder="Un commentaire, un souhait..."
              className="w-full bg-transparent border border-iron-rim p-3 text-aged-parchment outline-none font-body placeholder:text-aged-parchment/30 resize-none"
              rows={3}
            />
            <button
              type="submit"
              className={`forged-btn-primary w-full py-4 font-label text-label tracking-widest uppercase ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart;
