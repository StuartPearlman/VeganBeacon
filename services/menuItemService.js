import dummyData from './dummyData.json';

const menuItemService = {
  getVenues() {
    return new Promise(resolve => setTimeout(() => resolve(dummyData.venues), 1000));
  },
};

export default menuItemService;
