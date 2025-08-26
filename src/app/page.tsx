'use client';

import { useState, useEffect } from 'react';
import GetStart from '@/component/GetStart';
import Header from '@/component/Header';
import FooterMenu from '@/component/FooterMenu';
import BuyModal from '@/component/BuyModal';
import Cart from '@/component/Cart';
import type { Coffee } from '@/types/coffee';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [filter, setFilter] = useState("All Coffee");
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("/api/coffee")
      .then((res) => res.json())
      .then((data) => setCoffees(data))
  }, []);

  const coffeeTypes = ["All Coffee", ...new Set(coffees.map((c) => c.type))];

  const filteredCoffee =
    filter === "All Coffee"
      ? coffees
      : coffees.filter((c) => c.type === filter);

  return (
    <>
      {!started ? (
        <GetStart onStart={() => setStarted(true)} />
      ) : (
        <main>
          <Header />
          <div className="content">
            <div className="filter">
              {coffeeTypes.map((type) => (
                <span
                  key={type}
                  className={`filter_item ${filter === type ? "active" : ""}`}
                  onClick={() => setFilter(type)}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="coffee_list">
              {filteredCoffee.map((coffee) => (
                <div key={coffee.id} className="coffee_item">
                  <div className="item_img">
                    <img src={coffee.image} alt={coffee.name} />
                  </div>
                  <div className="item_info">
                    <h3>{coffee.name}</h3>
                    <p>{coffee.description}</p>
                  </div>
                  <div className="item_buy">
                    <span className="item_price">{coffee.price}</span>
                    <div className="buy_btn" onClick={() => setSelectedCoffee(coffee)}>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FooterMenu onCartClick={() => setIsCartOpen(true)} />
          {selectedCoffee && (
            <BuyModal
              coffee={selectedCoffee}
              onClose={() => setSelectedCoffee(null)}
              onBuySuccess={() => {
                setIsCartOpen(true);
              }}
            />
          )}

          {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </main>
      )}
    </>
  );
}
