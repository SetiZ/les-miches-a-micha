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
        <dt>Date</dt>
        <dd>
          {new Date(date).toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </dd>
        <dt>Commentaire</dt>
        <dd>{comment}</dd>
      </dl>
      <h2>Liste des produits</h2>
      <table>
        {cart.map((item) => (
          <tr key={item.id}>
            <td>
              {new Date(date).toLocaleTimeString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </td>
            <td>{item.name}</td>
            <td>{item.count * item.price}€</td>
            <td>{item.price}€</td>
            <td>{item.count}</td>
            <td>{name}</td>
          </tr>
        ))}
      </table>
      <h2>Total : {total}€</h2>
    </div>
  );
};
