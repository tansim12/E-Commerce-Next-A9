export const premiumData = [
  {
    name: "Premium",
    value: true,
  },
  {
    name: "Free",
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
