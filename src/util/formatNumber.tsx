const formatToNairaCurrency = (amount: any) => {
   const format = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
   }).format(amount);
  return format;
};
export default formatToNairaCurrency