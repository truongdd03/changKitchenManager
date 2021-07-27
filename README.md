# Chang's Kitchen Manager

Chang's Kitchen Manager is used to manage [the Chang's Kitchen app](https://github.com/truongdd03/changKitchen). Admin can use this website to update new menus and receive orders from customers. Thanks to Firebase Storage, Firebase Authentication, and Realtime Database, all changes made by admin will show immediately on customers' phones.

## User Stories

The following required functionality is completed:

* Authentication
  - [x] Admin has to sign in to make changes.
  - [x] Send reset-password emails.
  - [x] A logout button.
  - [x] Remember user: the website will be automatically logged in if the admin hasn't logged out.

* Menu Page
  - [x] Contains a date-picker to choose the specific menu. 
  - [x] The admin can add/remove dishes from today's menu, as well as edit future menus in advance.
  - [x] All the menus will be updated immediately on customers' apps even if there is only a small change.

* Orders Page
  - [x] Shows all orders in real-time.
  - [x] Alert when there is a new order.
  - [x] Has two buttons to update the order's status.

* Users Page
  - [x] Shows all customers' information.
  - [x] Contains a search bar for search customers by their name.
  - [x] Rank customers based on the number of orders they have made.

* Add Dish Page
  - [x] Shows all dishes of the restaurant.
  - [x] Make it easier to find dishes by adding a search bar.
  - [x] Contains an add button. The added dish, include name, price, course type, and image, will be stored on Firebase.
  - [x] Admin can remove any dish by clicking its delete button.

## Video Walkthrough
![](demo.gif)
