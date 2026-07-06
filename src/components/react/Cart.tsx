import { useCartStore } from '@/utils/store';
import { useToast } from '@/components/react/ToastProvider';
import { type FormEvent, useState } from 'react';
import { CgAdd, CgRemove, CgMail, CgPhone, CgCalendarDates, CgInfo } from 'react-icons/cg';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, total, count, add, remove, removeAll } = useCartStore();
  const toast = useToast();

  function sendOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const postData = async () => {
      const data = {
        name: formData.get('nom'),
        phoneNumber: formData.get('tel'),
        email: formData.get('email'),
        date: formData.get('date'),
        comment: formData.get('comment'),
        total: total(),
        cart: cart,
      };

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData()
      .then((data) => {
        if (data.id) {
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
            description: data.error || 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
            status: 'error',
          });
        }
      })
      .catch(() => {
        toast({
          title: 'Erreur',
          description: "Impossible d'envoyer la commande. Veuillez réessayer ou nous contacter au 06.52.39.48.79.",
          status: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  }

  const inputClass = 'input input-bordered w-full border-gray-600';
  const labelClass = 'flex items-center gap-2';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={onClose}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Panier</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">✕</button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          <div className="flex flex-col gap-4">
            {count() === 0 ? (
              <div className="text-center py-8 text-gray-500">Panier vide</div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-6 gap-3 w-full items-center">
                    <span className="col-span-3">{item.name}</span>
                    <div className="col-start-4 col-span-1 flex items-center gap-1">
                      <button className="btn btn-xs btn-ghost" onClick={() => remove(item.id)} aria-label="minus">
                        <CgRemove className="size-3" />
                      </button>
                      <span className="text-sm">{item.count}</span>
                      <button className="btn btn-xs btn-ghost" onClick={() => add(item)} aria-label="add">
                        <CgAdd className="size-3" />
                      </button>
                    </div>
                    <span className="col-end-7 col-span-2 justify-self-end">
                      {(item.price * item.count).toFixed(2)} €
                    </span>
                  </div>
                ))}
                <p className="self-end font-semibold">Total: {total().toFixed(2)} €</p>
                <p className="self-end text-sm text-gray-600">
                  Ce total est donné à titre indicatif, en fonction de la personnalisation de vos produits notamment. Des frais de livraison pourront être ajoutés le cas échéant.
                </p>
              </>
            )}
          </div>

          <div className="divider my-8 border-gray-600" />

          <form onSubmit={sendOrder}>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Veuillez entrer vos informations</h3>
              <p className="text-sm">Un email vous sera envoyé par la suite pour confirmer votre commande.</p>

              <label className={labelClass}>
                <CgInfo className="text-gray-600 size-5" />
                <input type="text" placeholder="nom" name="nom" className={inputClass} required />
              </label>
              <label className={labelClass}>
                <CgPhone className="text-gray-600 size-5" />
                <input type="tel" name="tel" placeholder="numéro de téléphone" className={inputClass} required />
              </label>
              <label className={labelClass}>
                <CgMail className="text-gray-600 size-5" />
                <input type="email" name="email" placeholder="email" className={inputClass} required />
              </label>
              <p className="text-sm">
                Veuillez spécifier l'heure de livraison souhaitée - comptez un minimum de 12h pour laisser au boulanger le temps de faire votre pain !
              </p>
              <label className={labelClass}>
                <CgCalendarDates className="text-gray-600 size-5" />
                <input type="datetime-local" name="date" placeholder="date et heure" className={inputClass} required />
              </label>
              <textarea
                name="comment"
                placeholder="Un commentaire, un souhait de personnalisation, une question, ou toute autre information utile"
                className="textarea textarea-bordered w-full border-gray-600"
              />
              <button type="submit" className={`btn btn-warning ${isLoading ? 'btn-disabled' : ''}`}>
                {isLoading ? <span className="loading loading-spinner" /> : 'Envoyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart;
