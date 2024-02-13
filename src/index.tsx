import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginSignUp from './components/LoginSignUp';
import Home from './components/Home';
import BooksComponent from './components/BooksComponent';
import ErrorComponent from './components/ErrorComponent';
import ForgotPassword from './components/ForgotPassword';
import BookDetails from './components/BookDetails';
import CartComponent from './components/CartComponent';
import { Provider } from 'react-redux';
import appStore from './utils/store/appstore';
import WishListComponent from './components/WishListComponent';
import OrderPlacedComponent from './components/OrderPlacedComponent';
import MyOrdersComponent from './components/MyOrdersComponent';
import ProfileComponent from './components/ProfileComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignUp />,
  },  
  {
    path: '/book',
    element: <Home />,
    children: [
      {
        path: '',
        element: <BooksComponent />
      },
      {
        path: ':bookId',
        element: <BookDetails />,
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: 'cartDetails',
        element: <CartComponent />,
      },
      {
        path: 'wishListDetails',
        element: <WishListComponent />
      },
      {
        path: 'order',
        element: <OrderPlacedComponent />
      },
      {
        path: 'myOrders',
        element: <MyOrdersComponent />
      },
      {
        path: 'profile',
        element: <ProfileComponent />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorComponent />
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
