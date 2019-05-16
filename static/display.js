import strings from './strings.js';
import Order from './order.js';

/* global io, document */
const socket = io();

const output = document.querySelector('#output');

const items = [];

socket.on('add', function(data){
    const order = new Order({
        takeaway: data.takeaway,
        orderno: data.orderno,
        tableno: data.tableno,
        time: new Date(data.time),
        items: data.items
    }, socket);
    items.push(order);
    output.appendChild(order.el);
    
});

socket.on('remove', (orderno) => {
    const remover = document.querySelector("#output .order-" + orderno  );
    if(remover) remover.parentElement.removeChild(remover)
})