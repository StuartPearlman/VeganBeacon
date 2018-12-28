import queryString from 'query-string';

function getRandomColor() {
  const letters = '789ABCD';
  let color = '';

  // eslint-disable-next-line array-callback-return
  [...Array(6)].map(() => {
    color += letters[Math.floor(Math.random() * 6)];
  });

  return color;
}

const avatarService = {
  getAvatarUrl(restaurantName) {
    const params = {
      background: getRandomColor(),
      name: restaurantName.split(' ').join('+'),
      color: 'FFFFFF',
    };

    return `https://ui-avatars.com/api/?${queryString.stringify(params)}`;
  },
};

export default avatarService;
