export const premiumData = [
  {
    name: "Available",
    value: true,
  },
  {
    name: "Stock Out",
    value: false,
  },
];

const postCategoriesArray = [
    "WebDevelopment",
    "SoftwareEngineering",
    "ArtificialIntelligence",
    "DataScience",
    "Cybersecurity",
    "MobileAppDevelopment",
    "CloudComputing",
    "DevOps",
    "MachineLearning",
    "BlockchainTechnology",
  ] as const;
export const categoryData = postCategoriesArray?.map((item) => ({
  name: item,
  value: item,
}));
export const categoryDataByLabel = postCategoriesArray?.map((item) => ({
  label: item,
  value: item,
}));
