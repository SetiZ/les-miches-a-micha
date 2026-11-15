import { type SubmitEvent, useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { fr } from 'react-day-picker/locale';
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
import { TIME_SLOTS } from '@/utils/timeSlots';
import 'react-day-picker/style.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>(
    'pickup',
  );
  const [address, setAddress] = useState('');
  // Prerendered HTML always shows an empty cart; render the real one only
  // after mount so hydration matches on load and on client-side navigation.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { cart, total, count, add, remove, removeAll } = useCartStore();
  const toast = useToast();
  const dateBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showEmpty = !mounted || count() === 0;

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) dlg.showModal();
    else if (!isOpen && dlg.open) dlg.close();
  }, [isOpen]);

  // closedby="any" fallback: light-dismiss where the attribute is unsupported (Safari)
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg || 'closedBy' in HTMLDialogElement.prototype) return;
    const outside = (e: PointerEvent) => {
      const r = dlg.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let pressedOutside = false;
    const down = (e: PointerEvent) => {
      pressedOutside = outside(e);
    };
    const up = (e: PointerEvent) => {
      if (pressedOutside && outside(e)) dlg.close();
    };
    dlg.addEventListener('pointerdown', down);
    dlg.addEventListener('pointerup', up);
    return () => {
      dlg.removeEventListener('pointerdown', down);
      dlg.removeEventListener('pointerup', up);
    };
  }, []);

  // Native close event fires for Esc, light-dismiss and programmatic close
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    dlg.addEventListener('close', onClose);
    return () => dlg.removeEventListener('close', onClose);
  }, [onClose]);

  function positionDatePicker(e: React.ToggleEvent<HTMLDivElement>) {
    if (e.newState !== 'open') return;
    const btn = dateBtnRef.current;
    if (!btn) return;
    const pop = e.currentTarget;
    const br = btn.getBoundingClientRect();
    const h = pop.getBoundingClientRect().height;
    const below = br.bottom + h <= window.innerHeight;
    const space = (below ? window.innerHeight - br.bottom : br.top) - 8;
    pop.style.top = below ? 'anchor(bottom)' : 'auto';
    pop.style.bottom = below ? '' : 'anchor(top)';
    pop.style.maxHeight = `${Math.max(160, space)}px`;
    pop.style.overflowY = 'auto';
  }

  async function sendOrder(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate) {
      toast({
        title: 'Date manquante',
        description: 'Veuillez choisir une date de retrait ou de livraison.',
        status: 'error',
      });
      return;
    }
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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <dialog
      id="cart-dialog"
      ref={dialogRef}
      aria-labelledby="cart-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="cart-dialog">
      <div className="flex items-center justify-between p-4 border-b border-iron-rim">
        <h2 id="cart-title" className="font-headline text-hmd text-fired-gold">
          Panier
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le panier"
          className="text-aged-parchment hover:text-fired-gold transition-colors">
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-4rem)] space-y-6">
        {showEmpty ? (
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
              personnalisation de vos produits notamment. Des frais de livraison
              pourront être ajoutés le cas échéant.
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
              autoComplete="name"
              className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
              required
            />
          </label>
          <label className="flex items-center gap-2 border border-iron-rim p-3">
            <CgPhone className="text-iron-rim size-5 shrink-0" />
            <input
              type="tel"
              name="tel"
              autoComplete="tel"
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
              autoComplete="email"
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
                autoComplete="street-address"
                placeholder="adresse de livraison"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-transparent text-aged-parchment w-full outline-none font-body placeholder:text-aged-parchment/30"
                required
              />
            </label>
          )}
          <p className="font-body text-sm text-aged-parchment/70">
            Veuillez spécifier le créneau de livraison souhaité. Comptez un
            minimum de 12h pour laisser au boulanger le temps de préparer votre
            commande !
          </p>
          <label className="flex items-center gap-2 border border-iron-rim p-3">
            <CgCalendarDates className="text-iron-rim size-5 shrink-0" />
            <button
              type="button"
              ref={dateBtnRef}
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
            onToggle={positionDatePicker}
            className="bg-surface-container border border-iron-rim rounded-lg shadow-xl p-2 text-aged-parchment"
            style={
              {
                positionAnchor: '--rdp',
                top: 'anchor(bottom)',
                left: 'anchor(left)',
                margin: 0,
              } as React.CSSProperties
            }>
            <DayPicker
              className="react-day-picker"
              style={
                {
                  '--rdp-accent-color': '#d4af37',
                  '--rdp-accent-background-color': 'rgba(212, 175, 55, 0.15)',
                  '--rdp-day_button-border-radius': '0.5rem',
                } as React.CSSProperties
              }
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={fr}
              disabled={{ before: tomorrow }}
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
            disabled={showEmpty || isLoading}
            className="forged-btn-primary w-full py-4 font-label text-label tracking-widest uppercase disabled:opacity-50 disabled:pointer-events-none">
            {isLoading ? 'Envoi...' : 'Envoyer'}
          </button>
          {showEmpty && (
            <p className="font-body text-sm text-ember-orange text-center">
              Ajoutez des produits à votre panier pour commander.
            </p>
          )}
        </form>
      </div>
    </dialog>
  );
};

export default Cart;
