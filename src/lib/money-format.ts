const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const moneyFormat = (amount: number) => formatter.format(amount);

export const fromCents = (cents: number) => cents / 100;

export const toCents = (amount: number | string) =>
  Math.round(Number(amount) * 100);

export const formatCents = (cents: number) => moneyFormat(fromCents(cents));
