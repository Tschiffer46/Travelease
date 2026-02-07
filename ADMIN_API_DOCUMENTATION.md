# Admin API Documentation

Comprehensive API routes for managing the Product Information Management (PIM) system.

## Base URL
All admin API routes are prefixed with `/api/admin`

## Authentication
🔒 **Important**: These routes should be protected with authentication middleware in production.

---

## Dashboard Stats

### GET `/api/admin/dashboard/stats`

Get overview statistics for the admin dashboard.

**Response:**
```json
{
  "products": {
    "total": 150,
    "active": 120,
    "draft": 20,
    "discontinued": 10,
    "lowStock": 5
  },
  "revenue": {
    "last30Days": 125000.00,
    "averageOrderValue": 1250.00,
    "orderCount": 100
  },
  "recentStockMovements": [
    {
      "id": "clx...",
      "productId": "clx...",
      "type": "purchase",
      "quantity": 50,
      "reference": "PO-2024-001",
      "notes": "Supplier delivery",
      "createdAt": "2024-01-15T10:30:00Z",
      "product": {
        "name": "Travel Backpack",
        "sku": "TB-001"
      }
    }
  ]
}
```

---

## Products

### GET `/api/admin/products`

List products with filtering, pagination, and sorting.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20) - Items per page
- `search` (string) - Search in name, SKU, or description
- `status` (string) - Filter by status: `draft`, `active`, `discontinued`, `out_of_stock`
- `category` (string) - Filter by category ID
- `brand` (string) - Filter by brand ID
- `sortBy` (string, default: `createdAt`) - Sort field
- `sortOrder` (string, default: `desc`) - Sort order: `asc` or `desc`

**Example Request:**
```
GET /api/admin/products?page=1&limit=20&status=active&search=backpack&sortBy=name&sortOrder=asc
```

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### POST `/api/admin/products`

Create a new product.

**Request Body:**
```json
{
  "name": "Travel Backpack 30L",
  "sku": "TB-30L-001",
  "slug": "travel-backpack-30l",
  "brand": "TravelPro",
  "description": "Durable 30L travel backpack",
  "shortDescription": "Perfect for weekend trips",
  "longDescription": "Detailed description...",
  "size": "30L",
  "sizeInMl": 30000,
  "isLiquid": false,
  "price": 1299.00,
  "costPrice": 799.00,
  "compareAtPrice": 1599.00,
  "currency": "SEK",
  "category": "Backpacks",
  "status": "active",
  "stock": 50,
  "featured": true,
  "isActive": true,
  "imageUrl": "https://example.com/image.jpg",
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "tags": ["travel", "backpack", "outdoor"],
  "ean": "1234567890123",
  "weight": 800,
  "dimensions": {
    "width": 300,
    "height": 500,
    "depth": 200
  },
  "taxRate": 25,
  "minOrderQuantity": 1,
  "maxOrderQuantity": 10,
  "countryOfOrigin": "Sweden",
  "ingredients": "N/A",
  "warnings": "Keep away from fire",
  "shelfLife": "5 years",
  "sortOrder": 0,
  "metaTitle": "Travel Backpack 30L - TravelPro",
  "metaDescription": "Buy the best 30L travel backpack...",
  "supplierId": "clx...",
  "categoryId": "clx...",
  "brandId": "clx..."
}
```

**Response:** Created product object (status 201)

**Errors:**
- 400: Validation error or duplicate SKU/slug
- 500: Server error

---

## Products by ID

### GET `/api/admin/products/:id`

Get a single product with all relations.

**Response:**
```json
{
  "id": "clx...",
  "name": "Travel Backpack 30L",
  "sku": "TB-30L-001",
  // ... all product fields
  "supplier": { "id": "clx...", "name": "Global Supplies" },
  "categoryRel": { "id": "clx...", "name": "Backpacks", "slug": "backpacks" },
  "brandRel": { "id": "clx...", "name": "TravelPro", "slug": "travelpro" },
  "productImages": [...],
  "volumeDiscounts": [...],
  "priceHistory": [...],
  "stockMovements": [...]
}
```

### PUT `/api/admin/products/:id`

Update a product.

**Request Body:** Same as POST, but all fields are optional.

**Response:** Updated product object

**Errors:**
- 400: Validation error or duplicate SKU/slug
- 404: Product not found
- 500: Server error

### DELETE `/api/admin/products/:id`

Soft delete a product (sets `isActive=false` and `status='discontinued'`).

**Response:**
```json
{
  "message": "Product soft deleted successfully"
}
```

**Errors:**
- 404: Product not found
- 500: Server error

---

## Categories

### GET `/api/admin/categories`

List all categories with parent/children hierarchy.

**Query Parameters:**
- `includeInactive` (boolean, default: false) - Include inactive categories

**Response:**
```json
{
  "categories": [
    {
      "id": "clx...",
      "name": "Travel Gear",
      "slug": "travel-gear",
      "description": "All travel gear",
      "parentId": null,
      "imageUrl": "https://example.com/category.jpg",
      "sortOrder": 0,
      "isActive": true,
      "children": [
        {
          "id": "clx...",
          "name": "Backpacks",
          "slug": "backpacks",
          "parentId": "clx...",
          "_count": { "products": 25 },
          "children": [...]
        }
      ],
      "_count": { "products": 150 }
    }
  ]
}
```

### POST `/api/admin/categories`

Create a new category.

**Request Body:**
```json
{
  "name": "Luggage",
  "slug": "luggage",
  "description": "All types of luggage",
  "parentId": "clx...",
  "imageUrl": "https://example.com/luggage.jpg",
  "sortOrder": 0,
  "isActive": true
}
```

**Response:** Created category object (status 201)

**Errors:**
- 400: Validation error, duplicate slug, or parent not found
- 500: Server error

---

## Categories by ID

### PUT `/api/admin/categories/:id`

Update a category.

**Request Body:** Same as POST, but all fields are optional.

**Errors:**
- 400: Validation error, duplicate slug, or circular reference
- 404: Category not found
- 500: Server error

### DELETE `/api/admin/categories/:id`

Delete a category (only if it has no children or products).

**Response:**
```json
{
  "message": "Category deleted successfully"
}
```

**Errors:**
- 400: Category has subcategories or products
- 404: Category not found
- 500: Server error

---

## Brands

### GET `/api/admin/brands`

List all brands with product count.

**Query Parameters:**
- `includeInactive` (boolean, default: false) - Include inactive brands

**Response:**
```json
{
  "brands": [
    {
      "id": "clx...",
      "name": "TravelPro",
      "slug": "travelpro",
      "description": "Premium travel gear brand",
      "website": "https://travelpro.com",
      "logoUrl": "https://example.com/logo.png",
      "countryOfOrigin": "Sweden",
      "isActive": true,
      "_count": { "products": 45 }
    }
  ]
}
```

### POST `/api/admin/brands`

Create a new brand.

**Request Body:**
```json
{
  "name": "TravelPro",
  "slug": "travelpro",
  "description": "Premium travel gear brand",
  "website": "https://travelpro.com",
  "logoUrl": "https://example.com/logo.png",
  "countryOfOrigin": "Sweden",
  "isActive": true
}
```

**Response:** Created brand object (status 201)

**Errors:**
- 400: Validation error or duplicate slug
- 500: Server error

---

## Brands by ID

### PUT `/api/admin/brands/:id`

Update a brand. All fields are optional.

### DELETE `/api/admin/brands/:id`

Delete a brand (only if it has no products).

**Errors:**
- 400: Brand has products
- 404: Brand not found
- 500: Server error

---

## Suppliers

### GET `/api/admin/suppliers`

List all suppliers with product count.

**Query Parameters:**
- `includeInactive` (boolean, default: false) - Include inactive suppliers

**Response:**
```json
{
  "suppliers": [
    {
      "id": "clx...",
      "name": "Global Supplies Ltd",
      "contactPerson": "John Doe",
      "email": "john@globalsupplies.com",
      "phone": "+46701234567",
      "website": "https://globalsupplies.com",
      "address": {
        "street": "123 Main St",
        "city": "Stockholm",
        "postalCode": "11122",
        "country": "Sweden"
      },
      "paymentTerms": "Net 30",
      "leadTimeDays": 14,
      "notes": "Reliable supplier",
      "isActive": true,
      "_count": { "products": 78 }
    }
  ]
}
```

### POST `/api/admin/suppliers`

Create a new supplier.

**Request Body:** Same structure as response object.

**Response:** Created supplier object (status 201)

---

## Suppliers by ID

### PUT `/api/admin/suppliers/:id`

Update a supplier. All fields are optional.

### DELETE `/api/admin/suppliers/:id`

Delete a supplier (only if it has no products).

**Errors:**
- 400: Supplier has products
- 404: Supplier not found
- 500: Server error

---

## Stock Movements

### POST `/api/admin/inventory/movements`

Create a stock movement and update product stock in a transaction.

**Request Body:**
```json
{
  "productId": "clx...",
  "type": "purchase",
  "quantity": 50,
  "reference": "PO-2024-001",
  "notes": "Supplier delivery"
}
```

**Movement Types:**
- `purchase` - Incoming stock from supplier (positive quantity)
- `sale` - Outgoing stock from sale (negative quantity)
- `adjustment` - Stock correction (positive or negative)
- `return` - Customer return (positive quantity)
- `write_off` - Damaged/lost stock (negative quantity)

**Response:**
```json
{
  "movement": {
    "id": "clx...",
    "productId": "clx...",
    "type": "purchase",
    "quantity": 50,
    "reference": "PO-2024-001",
    "notes": "Supplier delivery",
    "createdAt": "2024-01-15T10:30:00Z",
    "product": {
      "id": "clx...",
      "name": "Travel Backpack",
      "sku": "TB-001"
    }
  },
  "updatedStock": 100
}
```

**Errors:**
- 400: Validation error, insufficient stock, or zero quantity
- 404: Product not found
- 500: Server error

### GET `/api/admin/inventory/movements`

List stock movements with filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 50) - Items per page
- `productId` (string) - Filter by product ID
- `type` (string) - Filter by movement type
- `startDate` (ISO date) - Filter movements after this date
- `endDate` (ISO date) - Filter movements before this date

**Example Request:**
```
GET /api/admin/inventory/movements?productId=clx...&type=purchase&startDate=2024-01-01
```

**Response:**
```json
{
  "movements": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 250,
    "totalPages": 5
  }
}
```

---

## Error Handling

All endpoints follow consistent error response format:

**Validation Error (400):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "inclusive": true,
      "message": "String must contain at least 1 character(s)",
      "path": ["name"]
    }
  ]
}
```

**Not Found (404):**
```json
{
  "error": "Product not found"
}
```

**Server Error (500):**
```json
{
  "error": "Failed to fetch products"
}
```

---

## Security Considerations

⚠️ **Before deploying to production:**

1. Add authentication middleware to all `/api/admin/*` routes
2. Implement role-based access control (RBAC)
3. Add rate limiting
4. Enable CORS only for trusted domains
5. Validate all user inputs
6. Use environment variables for sensitive data
7. Enable HTTPS only
8. Add API request logging
9. Implement audit trails for all changes
10. Add CSRF protection

---

## Testing Examples

### Using cURL:

```bash
# List products
curl -X GET "http://localhost:3000/api/admin/products?page=1&limit=10"

# Create product
curl -X POST "http://localhost:3000/api/admin/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "sku": "TEST-001",
    "slug": "test-product",
    "brand": "TestBrand",
    "description": "Test description",
    "size": "Medium",
    "price": 99.99,
    "category": "Test",
    "isLiquid": false
  }'

# Create stock movement
curl -X POST "http://localhost:3000/api/admin/inventory/movements" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "clx...",
    "type": "purchase",
    "quantity": 50,
    "reference": "PO-001"
  }'
```

### Using JavaScript Fetch:

```javascript
// Get dashboard stats
const stats = await fetch('/api/admin/dashboard/stats');
const data = await stats.json();
console.log(data);

// Create product
const response = await fetch('/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Product',
    sku: 'TEST-001',
    slug: 'test-product',
    brand: 'TestBrand',
    description: 'Test description',
    size: 'Medium',
    price: 99.99,
    category: 'Test',
    isLiquid: false
  })
});
const product = await response.json();
```

---

## Database Schema Reference

The API uses these Prisma models:
- `Product` - Main product data with PIM fields
- `Category` - Hierarchical categories
- `Brand` - Product brands
- `Supplier` - Product suppliers
- `ProductImage` - Product images
- `VolumeDiscount` - Bulk pricing
- `PriceHistory` - Price change tracking
- `StockMovement` - Inventory changes

See `prisma/schema.prisma` for complete schema.
