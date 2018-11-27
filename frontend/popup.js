const pusher = new Pusher('PUSHER_APP_KEY', {
  cluster: 'PUSHER_APP_CLUSTER',
  encrypted: true
});

document.getElementById('scores').addEventListener('click', () => {
  fetch('http://localhost:3000/start');
});

const channel = pusher.subscribe('realtime-updates');

channel.bind('scores', data => {
  const [teamOne, teamTwo] = data;

  document.getElementById('results').innerHTML = `
    <span>${teamOne.name}</span> - ${teamOne.score}<br/>
    <span>${teamTwo.name}</span> - ${teamTwo.score}<br />
  `;

  notify(teamOne, teamTwo);
});

const notify = (teamOne, teamTwo) => {
  if (teamOne.score !== 0 && teamTwo.score !== 0) {
    const notificationId = 'notify';

    const options = {
      type: 'basic',
      iconUrl: './img/icon.png',
      title: `${teamOne.name} vs ${teamTwo.name}`,
      message: `There's been a score update on the game between ${teamOne.name} and ${teamTwo.name}.`
    };

    chrome.notifications.create(notificationId, options);
    chrome.notifications.clear(notificationId);
  }
};
