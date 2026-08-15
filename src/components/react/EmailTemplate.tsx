import type * as React from 'react';
import { TIME_SLOT_LABELS } from '@/utils/timeSlots';

interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
}

interface EmailTemplateProps {
  name: string;
  phoneNumber: string;
  email: string;
  date: string;
  timeSlot: string;
  deliveryMode: 'pickup' | 'delivery';
  address: string;
  comment: string;
  total: number;
  cart: CartItem[];
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phoneNumber,
  email,
  date,
  timeSlot,
  deliveryMode,
  address,
  comment,
  total,
  cart,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <h1>Nouvelle commande !</h1>
      <dl>
        <dt>Nom</dt>
        <dd>{name}</dd>
        <dt>Numéro de téléphone</dt>
        <dd>{phoneNumber}</dd>
        <dt>Email</dt>
        <dd>{email}</dd>
        <dt>Date de livraison</dt>
        <dd>
          {formattedDate} — {TIME_SLOT_LABELS[timeSlot] || timeSlot}
        </dd>
        <dt>Mode de réception</dt>
        <dd>{deliveryMode === 'pickup' ? 'En magasin' : 'Livraison'}</dd>
        {deliveryMode === 'delivery' && address && (
          <>
            <dt>Adresse de livraison</dt>
            <dd>{address}</dd>
          </>
        )}
        {comment && (
          <>
            <dt>Commentaire</dt>
            <dd>{comment}</dd>
          </>
        )}
      </dl>
      <h2>Liste des produits</h2>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}€</td>
              <td>{item.count}</td>
              <td>{(item.count * item.price).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total : {total.toFixed(2)}€</h2>
    </div>
  );
};

interface CustomerEmailTemplateProps {
  name: string;
  date: string;
  timeSlot: string;
  deliveryMode: 'pickup' | 'delivery';
  total: number;
  cart: CartItem[];
  siteUrl: string;
}

export const CustomerEmailTemplate: React.FC<
  Readonly<CustomerEmailTemplateProps>
> = ({ name, date, timeSlot, deliveryMode, total, cart, siteUrl }) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <h1>Confirmation de commande</h1>
      <p>Bonjour {name},</p>
      <p>Nous avons bien reçu votre commande et nous vous en remercions !</p>
      <p>
        Votre boulanger vous contactera rapidement pour confirmer le créneau de
        livraison.
      </p>
      <h2>Récapitulatif de votre commande</h2>
      <p>
        <strong>Date de livraison souhaitée :</strong> {formattedDate} —{' '}
        {TIME_SLOT_LABELS[timeSlot] || timeSlot}
      </p>
      <p>
        <strong>Mode de réception :</strong>{' '}
        {deliveryMode === 'pickup' ? 'En magasin' : 'Livraison'}
      </p>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}€</td>
              <td>{item.count}</td>
              <td>{(item.count * item.price).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total : {total.toFixed(2)}€</h2>
      <p>
        Ce total est donné à titre indicatif, en fonction de la personnalisation
        de vos produits notamment. Des frais de livraison pourront être ajoutés
        le cas échéant.
      </p>
      <p>
        À très bientôt,
        <br />
        <strong>L&rsquo;équipe des Miches à Micha</strong>
      </p>
      <p>
        <small>
          <a href={siteUrl}>{siteUrl}</a>
        </small>
      </p>
    </div>
  );
};
