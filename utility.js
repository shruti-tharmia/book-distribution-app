const getFormData = (formElement) => {
  const formData = new FormData(formElement);

  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
};

// let store = {
//     token: ""
// };

// const modifyStore = (key, payload) => {
//     store = { ...store, [key]: payload };

//     return store;
// }

// const getStore = (key) => {
//     return store[key];
// }

export default {
  getFormData,
  // modifyStore,
  // getStore
};
