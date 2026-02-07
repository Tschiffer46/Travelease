export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Haircare' | 'Hygiene' | 'Cosmetics';
  size: string;
  price: number; // SEK
  image?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
