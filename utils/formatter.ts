export default function formatter(value: number, currency: string) {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}
