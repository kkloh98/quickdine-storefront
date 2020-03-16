String.prototype.formatPrice = function(currency = "MYR") {
  return parseFloat(this.valueOf()).toLocaleString("en-US", {
    style: "currency",
    currency
  });
};
