import { faker } from "@faker-js/faker";
import { User, Payment, PurchaseRecord, CreditCard } from "@/lib/types";

const generateCreditCard = (): CreditCard => {
  return {
    number: faker.finance.creditCardNumber(),
    issuer: faker.finance.creditCardIssuer(),
    expirationDate: faker.date.future().toLocaleDateString(),
    cvv: faker.finance.creditCardCVV(),
  };
};

const generateUser = (creditCard: CreditCard): User => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    creditCard,
    address: {
      street: faker.address.street(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    },
  };
};

const generatePurchaseRecord = (
  user: User,
  payment: Payment
): PurchaseRecord => {
  return {
    user,
    userId: user.email,
    amount: payment.amount,
    date: payment.date,
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      productId: faker.string.uuid(),
      productName: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      quantity: faker.number.int({ min: 1, max: 10 }),
    })),
    payment,
  };
};

const generatePayment = (user: User): Payment => {
  return {
    id: faker.string.uuid(),
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
