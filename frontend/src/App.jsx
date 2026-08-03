import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import NodosTab from './pages/NodosTab.jsx';
import MayoristasTab from './pages/MayoristasTab.jsx';
import CartTab from './pages/CartTab.jsx';
import ImpactTab from './pages/ImpactTab.jsx';
import { INITIAL_PRODUCTS, INITIAL_NODES } from './utils/data.js';
import { getProducts } from "./services/productService";


export default function App() {
  const [activeTab, setActiveTab] = useState('nodos');
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [currentNode, setCurrentNode] = useState(INITIAL_NODES[0]); // default is Villa Crespo
  
  // =========================
  // Productos obtenidos desde la API
  // =========================  
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  // Keep track of user's shopping basket of added wholesale products
  const [addedProducts, setAddedProducts] = useState([]);
  
  // User savings accumulated during this active session
  const [sessionSavings, setSessionSavings] = useState(0);

  // =========================
// Obtener catálogo desde el Backend
// =========================

useEffect(() => {

    async function cargarProductos() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProducts(false);
        }
    }
    cargarProductos();

}, []);

  // Invitation code lookup router
  const handleJoinNodeByCode = (code) => {
    let matchedNode = null;
    const cleanCode = code.toUpperCase().trim();

    if (cleanCode.startsWith('VC')) {
      matchedNode = nodes.find(n => n.id === 'node-vc') || null;
    } else if (cleanCode.startsWith('CH')) {
      matchedNode = nodes.find(n => n.id === 'node-ch') || null;
    } else if (cleanCode.startsWith('PA')) {
      matchedNode = nodes.find(n => n.id === 'node-p') || null;
    } else if (cleanCode.startsWith('AL')) {
      matchedNode = nodes.find(n => n.id === 'node-al') || null;
    }

    if (matchedNode) {
      setCurrentNode(matchedNode);
      // Wait a moment, and switch to mayoristas shop tab
      setTimeout(() => {
        setActiveTab('mayoristas');
      }, 1200);
      return `Nodo ${matchedNode.name}`;
    }
    return false;
  };

  const handleChangeNode = (nodeId) => {
    const matched = nodes.find(n => n.id === nodeId);
    if (matched) {
      setCurrentNode(matched);
      // Switch tab
      setActiveTab('mayoristas');
    }
  };

  // Add a product units to cooperative cart and increment the progress bar!
  const handleAddProductToCart = (product) => {
    // 1. Update the product's progress bar in our state
    // ← AGREGÁS ESTO: si ya llegó al límite, no hace nada
    if (product.progressCurrent >= product.progressTarget) return;

    setProducts(prevProducts => 
      prevProducts.map(p => {
        if (p.id === product.id) {
          const nextProgress = p.progressCurrent + 1;
          const isFull = nextProgress >= p.progressTarget;
          return {
            ...p,
            progressCurrent: nextProgress > p.progressTarget ? p.progressTarget : nextProgress,
            status: isFull ? 'activo' : p.status // remains active but closed status changes inside card based on progress 
          };
        }
        return p;
      })
    );

    // 2. Add to user basket
    setAddedProducts(prevAdded => {
      const existingIdx = prevAdded.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prevAdded];
        copy[existingIdx] = {
          ...copy[existingIdx],
          qty: copy[existingIdx].qty + 1,
          product: { ...copy[existingIdx].product } // no muta el original
        };
        return copy;
      } else {
        return [...prevAdded, { product: { ...product }, qty: 1 }];
      }
    });
  };

  // Remove an item from user's shopping basket and decrement the progress bar
  const handleRemoveProductFromCart = (productId) => {
    const itemInCart = addedProducts.find(item => item.product.id === productId);
    if (!itemInCart) return;

    // 1. Decrement progress bar
    setProducts(prevProducts => 
      prevProducts.map(p => {
        if (p.id === productId) {
          const nextProgress = Math.max(0, p.progressCurrent - itemInCart.qty);
          return {
            ...p,
            progressCurrent: nextProgress
          };
        }
        return p;
      })
    );

    // 2. Remove from cart
    setAddedProducts(prevAdded => prevAdded.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    // Decrease progress bars back to initial parameters
    setAddedProducts([]);
  };

  const handleConfirmCheckoutSuccess = (savedQuantity) => {
    // Save points to session impact dashboard
    setSessionSavings(prev => prev + savedQuantity);
    
    // Clear user's active selections but keep progress bars full of list
    setAddedProducts([]);
    
    // Auto transition to the Impact dashboard after 5 seconds
    setTimeout(() => {
      setActiveTab('impacto');
    }, 4500);
  };

  const handleGeneralShareAlert = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EcoSurtido / AhorroSurtido',
        text: `¡Hola! Me uní al Nodo ${currentNode.name} en AhorroSurtido y ahorré un montón comprando al por mayor en grupo. ¡Súmate usando la invitación!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(`¡Invitación copiada al portapapeles! Comparte este enlace con tus vecinos para que se sumen al Nodo de ${currentNode.name}.`);
    }
  };

  // Get current shopping cart length
  const cartAmount = addedProducts.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between" id="applet-main-container">
      <div>
        {/* Dynamic header navigation */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          cartCount={cartAmount}
          currentNodeName={currentNode.name}
        />

        {/* Dynamic main viewport rendering based on state */}
        <main className="pb-16">
          {activeTab === 'nodos' && (
            <NodosTab 
              nodesList={nodes}
              currentNode={currentNode}
              onChangeNode={handleChangeNode}
              onJoinNodeByCode={handleJoinNodeByCode}
            />
          )}

          {activeTab === 'mayoristas' && (
            <MayoristasTab 
              products={products}
              loading={loadingProducts}
              onAddProductToCart={handleAddProductToCart}
              currentNodeName={`Nodo ${currentNode.name}`}
            />
          )}

          {activeTab === 'carrito' && (
            <CartTab 
              addedProducts={addedProducts}
              onRemoveItem={handleRemoveProductFromCart}
              onClearCart={handleClearCart}
              onConfirmSuccess={handleConfirmCheckoutSuccess}
            />
          )}

          {activeTab === 'impacto' && (
            <ImpactTab 
              userSavings={sessionSavings}
              onShareAlert={handleGeneralShareAlert}
            />
          )}
        </main>
      </div>

      {/* Humble Footer containing copy note */}
      <footer className="py-6 border-t border-[#eae8e4] bg-white text-center text-xs text-[#8a7a6b] select-none">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 AhorroSurtido • Compras Mayoristas en Comunidad • Desarrollado por Alumnos de Fundación Pescar</p>
        </div>
      </footer>
    </div>
  );
}
