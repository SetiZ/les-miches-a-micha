import type * as React from 'react';

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
  comment: string;
  total: number;
  cart: CartItem[];
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phoneNumber,
  email,
  date,
  comment,
  total,
  cart,
}) => {
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
          {new Date(date).toLocaleTimeString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </dd>
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
  total: number;
  cart: CartItem[];
  siteUrl: string;
}

export const CustomerEmailTemplate: React.FC<
  Readonly<CustomerEmailTemplateProps>
> = ({ name, date, total, cart, siteUrl }) => {
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
        <strong>Date de livraison souhaitée :</strong>{' '}
        {new Date(date).toLocaleTimeString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
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
        Ce total est donné à titre indicatif. Des frais de livraison pourront
        être ajoutés le cas échéant.
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
