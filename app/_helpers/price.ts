import { Product } from "@prisma/client";

export const calculeteProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discountValue =
    (Number(product.price) * Number(product.discountPercentage)) / 100;

  return Number(product.price) - discountValue;
};

export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};
