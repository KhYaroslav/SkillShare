const { WebSocketServer } = require('ws');
const { Message, User } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id, name } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user });

  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(
      JSON.stringify({
        type: 'ADD_CHAT_USER',
        payload: Array.from(wsMap.values()).map((el) => el.user),
      }),
    );
  }

  ws.on('message', async (message) => {
    const { type, payload } = JSON.parse(message);

    switch (type) {
      case 'SET_CHAT_MESSAGE':
        const message = await Message.create({
          user_id: id,
          message: payload.message,
        });
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'ADD_CHAT_MESSAGE',
              payload: {
                name,
                id,
                message: message.message,
                msId: message.id,
              },
            }),
          );
        }
        break;
      case 'GET_CHAT_MESSAGES':
        const messages = await Message.findAll({ limit: 5, include: User });
        const data = JSON.parse(JSON.stringify(messages)).map((el) => ({
          name: el.User.name,
          id: el.User.id,
          message: el.message,
          msId: el.id,
        }));
        ws.send(
          JSON.stringify({
            type: 'ADD_CHAT_MESSAGES',
            payload: data,
          }),
        );
        break;
      case 'WS_ALARM':
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'SET_ALL_USERS_ALARM',
              payload: true,
            }),
          );
        }

      default:
        break;
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'ADD_CHAT_USER',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

module.exports = wss;
