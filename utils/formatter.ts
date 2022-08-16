export default function formatter(value: number, currency: string) {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function formatWithoutCurrencySymbol(value: number) {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "never",
    currencyDisplay: "none",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}
