import dummyData from './dummyData.json';

export const menuItemService = {
    getVenues() {
        return new Promise(resolve => setTimeout(() => resolve(dummyData.venues), 1000));
    }
};
