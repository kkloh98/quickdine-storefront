Number.prototype.formatPrice = function(currency = "MYR") {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: currency
  });
};
