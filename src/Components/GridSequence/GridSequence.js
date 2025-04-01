import React, { useState } from "react";
import './GridSequence.css';

function Cell({filled, onClick, isDisabled, label}) {
    return (
        <button
          type="button"
          aria-label={label}
          disabled={isDisabled}
          onClick={onClick}
          className={filled ? "cell cell-activated" : "cell"}
        />
      );
}

export default function GridSequence() {
    const [order, setOrder] = useState([]);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const config = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ];

    const deActivateCells = (index) => {
        setIsDeactivating(true);
        const timer = setInterval(() => {
        setOrder((origOrder) => {
            const newOrder = origOrder.slice();
            newOrder.pop();

            if (newOrder.length === 0) {
            clearInterval(timer);
            setIsDeactivating(false);
            }

            return newOrder;
        });
        }, 300);
    }

    const activateCells = (index) => {
        const newOrder = [...order, index];
        setOrder(newOrder);
        // deactivate
        if (newOrder.length === config.flat(1).filter(Boolean).length) {
            deActivateCells();
        }
    }

    return (
        <div className="wrapper">
            <div 
                className="grid"
                style={{gridTemplateColumns: `repeat(${config[0].length}, 1fr)`}}
            >
                {config.flat(1).map((value, index) => {
                    return value ? (
                        <Cell
                            key={index}
                            filled={order.includes(index)}
                            onClick={() => activateCells(index)}
                            isDisabled={order.includes(index) || isDeactivating}
                            label={`Cell ${index}`}
                        />
                    ) : <span />}
                )}
            </div>
        </div>
    )
}