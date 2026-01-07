const {
  calculateDiscount,
  filterProducts,
  sortInventory,
} = require("../product-inventory/productInventory");

/* =========================
   calculateDiscount Tests
   ========================= */

describe("calculateDiscount", () => {
  test("applies a valid discount rate", () => {
    expect(calculateDiscount(100, 0.1)).toBe(90);
  });

  test("handles an invalid discount rate gracefully", () => {
    expect(calculateDiscount(100, -0.1)).toBeNull();
  });

  test("handles edge case with price of 0", () => {
    expect(calculateDiscount(0, 0.2)).toBe(0);
  });
});

/* =========================
   filterProducts Tests
   ========================= */

describe("filterProducts", () => {
  const products = [
    { name: "apple", price: 4 },
    { name: "banana", price: 6 },
  ];

  test("returns products with price less than $5", () => {
    const result = filterProducts(products, (p) => p.price < 5);
    expect(result).toStrictEqual([{ name: "apple", price: 4 }]);
  });

  test("returns empty array when no product matches", () => {
    const result = filterProducts(products, (p) => p.price < 2);
    expect(result).toStrictEqual([]);
  });

  test("returns empty array for invalid inputs", () => {
    expect(filterProducts(null, () => true)).toStrictEqual([]);
  });
});
/* =========================
   sortInventory Tests
   ========================= */

describe("sortInventory", () => {
  const inventory = [
    { name: "Item A", price: 30 },
    { name: "Item B", price: 10 },
    { name: "Item C", price: 20 },
  ];

  test("sorts inventory by price in ascending order", () => {
    const result = sortInventory(inventory, "price");
    expect(result).toStrictEqual([
      { name: "Item B", price: 10 },
      { name: "Item C", price: 20 },
      { name: "Item A", price: 30 },
    ]);
  });

  test("does not mutate the original inventory array", () => {
    sortInventory(inventory, "price");
    expect(inventory).toStrictEqual([
      { name: "Item A", price: 30 },
      { name: "Item B", price: 10 },
      { name: "Item C", price: 20 },
    ]);
  });

  test("returns empty array if inventory is not an array", () => {
    expect(sortInventory(null, "price")).toStrictEqual([]);
  });

  test("returns empty array if key is not a string", () => {
    expect(sortInventory(inventory, 123)).toStrictEqual([]);
  });

  test("returns inventory unchanged if key does not exist", () => {
    const result = sortInventory(inventory, "unknownKey");
    expect(result).toEqual(inventory);
  });

  test("handles edge case with empty inventory", () => {
    expect(sortInventory([], "price")).toStrictEqual([]);
  });
});
