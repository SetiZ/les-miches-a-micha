interface CartItem {
  id: string;
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
}) => (
  <div>
    <h1>Nouvelle commande !</h1>
    <dl>
      <dt>Nom</dt>
      <dd>{name}</dd>
      <dt>Numéro de téléphone</dt>
      <dd>{phoneNumber}</dd>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Date</dt>
      <dd>{(new Date(date)).toLocaleString('fr-FR')}</dd>
      <dt>Commentaire</dt>
      <dd>{comment}</dd>
    </dl>
    <h2>Liste des produits</h2>
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {item.count} {item.name} - {item.price}€
        </li>
      ))}
    </ul>
    <h2>Total : {total}€</h2>
  </div>
);
