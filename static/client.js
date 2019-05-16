/* global io, document */
const socket = io();

const button = document.querySelector('#order');
const selection = document.querySelector('#selection');

import menu from './items.js';
import strings from './strings.js'; 

button.addEventListener('click', function() {
    var items = [];
    menu.forEach((item, n) => {
        const amount = JSON.parse(els[n].value);
        
        if (amount > 0) items.push({
            type: item,
            amount
        });

        els[n].value = 0;
    });
    socket.emit('add', {
        takeaway: takeaway.checked,
        orderno: Date.now().toString().replace(/.*(.{2}$)/, "$1"),
        tableno: takeaway.checked ? orderno : table.value, 
        time: new Date(),
        items
    });
    table.value = 0;
});

var els = [];
const toprow = document.createElement('div');
const takeaway = document.createElement('input');
const tklabel = document.createElement('label');
tklabel.innerHTML = "takeaway"
tklabel.appendChild(takeaway);
toprow.appendChild(tklabel)
takeaway.type = 'checkbox';


const table = document.createElement('input');
toprow.appendChild(table);
selection.appendChild(toprow)
table.value = 0;

menu.forEach(el => {
    const wrapper = document.createElement('div');
    const amount = document.createElement('input');
    const label = document.createElement('button');
    const remove = document.createElement('button');

    remove.textContent = '-';

    amount.value = 0;
    amount.min = 0;
    amount.step = 1;
    amount.disabled = true;
    
    label.textContent = strings[el];
    
    label.addEventListener('click', e => {
        amount.value = Number(amount.value) + 1
    });
    
    remove.addEventListener('click', e => {
        if(Number(amount.value) > 0) amount.value = Number(amount.value) - 1
    });
    

    wrapper.appendChild(amount);
    wrapper.appendChild(label);
    wrapper.appendChild(remove);
    
    els.push(amount);

    selection.appendChild(wrapper);
});