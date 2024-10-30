export const ConvertAuthLabel = (name: string) => {
  switch (name) {
    case "email":
      return "Email Address";
    case "name":
      return "Full Name";
    default:
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
};
