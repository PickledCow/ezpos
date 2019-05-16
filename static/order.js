import strings from './strings.js';
/* global document */

class Order {
    constructor(options, socket) {
        this.el = document.createElement('div');
        this.title = document.createElement('div');
        this.itemlist = document.createElement('ul');
        this.removeBtn = document.createElement('button');
        
        this.orderno - options.orderno
        
        this.el.className = `order order-${options.orderno}${options.takeaway ? " takeaway" : ""}`;

        this.title.textContent = `${options.takeaway ? "Order" : "Table"} ${options.takeaway ? options.orderno : options.tableno}`;
        this.removeBtn.textContent = '×';

        options.items.forEach((i) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const newItem = document.createElement('li');
            newItem.textContent = `${i.amount} × ${strings[i.type]}`;
            this.itemlist.appendChild(checkbox);
            this.itemlist.appendChild(newItem);
        });

        this.el.appendChild(this.title);
        this.title.appendChild(this.removeBtn);
        this.el.appendChild(this.itemlist);

        this.removeBtn.addEventListener('click', (e) =>{ 
            socket.emit("remove", options.orderno)
        });
    }
}

export default Order;
