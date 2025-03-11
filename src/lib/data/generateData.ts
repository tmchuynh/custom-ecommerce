import { faker } from "@faker-js/faker";
import { User, Payment, PurchaseRecord, CreditCard } from "@/lib/types";

/**
 * Generates a random credit card object.
 *
 * @returns {CreditCard} An object containing the following properties:
 * - `number`: A randomly generated credit card number.
 * - `issuer`: The issuer of the credit card.
 * - `expirationDate`: The expiration date of the credit card in a localized string format.
 * - `cvv`: A randomly generated CVV code.
 */
const generateCreditCard = (): CreditCard => {
  return {
    number: faker.finance.creditCardNumber(),
    issuer: faker.finance.creditCardIssuer(),
    expirationDate: faker.date.future().toLocaleDateString(),
    cvv: faker.finance.creditCardCVV(),
  };
};

/**
 * Generates a user object with random personal information and a provided credit card.
 *
 * @param {CreditCard} creditCard - The credit card information to associate with the user.
 * @returns {User} A user object containing random personal details and the provided credit card.
 */
const generateUser = (creditCard: CreditCard): User => {
  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    creditCard,
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    },
  };
};

/**
 * Generates a purchase record for a given user and payment.
 *
 * @param {User} user - The user making the purchase.
 * @param {Payment} payment - The payment details for the purchase.
 * @returns {PurchaseRecord} The generated purchase record containing user details, purchase date, items purchased, and payment information.
 */
const generatePurchaseRecord = (
  user: User,
  payment: Payment
): PurchaseRecord => {
  return {
    user,
    userId: user.email,
    date: payment.date,
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.string.numeric(5),
      productName: faker.commerce.productName(),
      price: parseFloat(
        faker.finance.amount({
          min: 5,
          max: 45,
          dec: 5,
          symbol: "",
          autoFormat: true,
        })
      ),
      quantity: faker.number.int({ min: 1, max: 10 }),
    })),
    payment,
  };
};

/**
 * Generates a payment object for a given user.
 *
 * @param {User} user - The user for whom the payment is being generated.
 * @returns {Payment} The generated payment object.
 */
const generatePayment = (user: User): Payment => {
  return {
    id: faker.string.alphanumeric({ length: 10, casing: "upper" }),
    amount: parseFloat(faker.finance.amount()),
    status: faker.helpers.arrayElement([
      "pending",
      "processing",
      "success",
      "failed",
    ]),
    email: user.email,
    date: faker.date.recent(),
  };
};

/**
 * Generates fake data for users, payments, and purchase records.
 *
 * @param {number} numUsers - The number of users to generate.
 * @param {number} numPayments - The total number of payments to generate.
 * @returns {{ users: User[], payments: Payment[], purchaseRecords: PurchaseRecord[] }}
 * An object containing arrays of generated users, payments, and purchase records.
 */
export const generateFakeData = (numUsers: number, numPayments: number) => {
  const users: User[] = [];
  const payments: Payment[] = [];
  const purchaseRecords: PurchaseRecord[] = [];

  for (let i = 0; i < numUsers; i++) {
    const creditCard = generateCreditCard();
    const user = generateUser(creditCard);
    users.push(user);

    for (let j = 0; j < numPayments / numUsers; j++) {
      const payment = generatePayment(user);
      payments.push(payment);

      const purchaseRecord = generatePurchaseRecord(user, payment);
      purchaseRecords.push(purchaseRecord);
    }
  }

  return { users, payments, purchaseRecords };
};
