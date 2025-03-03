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
