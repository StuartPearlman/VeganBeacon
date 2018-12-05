import dummyData from './dummyData.json';

const menuItemService = {
  getVenues() {
    return new Promise(resolve => setTimeout(() => resolve(dummyData.venues), 0));
  },
};

export default menuItemService;
