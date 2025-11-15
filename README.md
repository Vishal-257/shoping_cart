# React + TypeScript + Vite

🛍️ E-Commerce Product Filter & Cart Application
This application is a simple simulation of an e-commerce interface built using React and styled with Tailwind CSS.

It effectively manages two distinct states:

Product Display: Products are fetched from mock data and displayed in a grid. Users can dynamically filter this list by selecting categories ("Electronics," "Books," "Clothing," or "All").

Shopping Cart: A separate, independent section tracks selected items. Users can add products from the main list, and the cart section calculates and displays the quantity, subtotal, and grand total of all items. Items can be individually removed from the cart.

The use of useState handles the core logic for filtering and cart updates, while useMemo optimizes performance by efficiently calculating the filtered list and the final cart total only when necessary.

Installation Guide:
1. Create a new folder.
2. Download the project files in your folder:
    ```git clone <repo-url>```
3. In your terminal cd to the respective folder:
    ```cd <project-folder>```
4. Install all the dependencies:
    ```npm install```
5. Now run the project by:
    ```npm run dev```
The project will be live on http://localhost:5173/
