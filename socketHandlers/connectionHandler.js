const connectedUsers = new Map();
let io = null;

export const setSocketInstance = (IoInstance) => {
    io = IoInstance;
};

export const addNewConnectedUser = (socketId, userId) => {
    connectedUsers.set(socketId, userId);
    console.log(connectedUsers);
    if (connectedUsers.has(socketId)) {
        return true;
    } else {
        return false;
    }
};

export const disconnectUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        return true;
    } else {
        return false;
    }
}

export const getUserBySocket = (socketId) => {
    if (connectedUsers.has(socketId)) {
        return connectedUsers.get(socketId);
    } else {
        return null
    }
}

export const getSocketByUser = (userId) => {
    let sockets = [];
    for (const [key, val] of connectedUsers.entries()) {
        if (val === userId) {
            sockets.push(key);
        }
    }
    return sockets;
}