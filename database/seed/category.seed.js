const faker = require("faker");

const fs = require("fs");

faker.locale = "vi";
//Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      thumbnailUrl: faker.image.image(60, 60),
      name: faker.commerce.product(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        material: faker.commerce.productMaterial(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(200, 200),
      };
      productList.push(product);
    });
  }

  return productList;
};

// IFFE

(() => {
  //random data

  const categoryList = randomCategoryList(20);
  const productList = randomProductList(categoryList, 20);

  //prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };
  //write db object to db.json
  // fs.writeFile("db.json", JSON.stringify(db), () => {
  //   console.log("generate successfully : ");
  // });
  seeder.connect(db);
})();
