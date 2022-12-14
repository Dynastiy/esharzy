const Home = () =>
  import('../pages/indexPage.vue')
const ProductDetails = () =>
  import('../pages/details/productDetails.vue')
const Shop = () =>
  import('../pages/allProducts.vue')
const Stores = () =>
  import('../pages/storeListing.vue')
const StoreDetails = () =>
  import('../pages/details/storeDetails.vue')
const CategoryDetails = () =>
  import('../pages/details/categoryDetails.vue')
const PrivacyPolicy = () =>
  import('../pages/privacyPolicy.vue')
const TermsAndConditions = () =>
  import('../pages/termsAndConditions.vue')
const RefundPolicy = () =>
  import('../pages/saleTermsandConditions.vue')
const TransactionCancelled = () =>
  import('../pages/transactionCancelled.vue')
const TransactionFailed = () =>
  import('../pages/transactionFailed.vue')
const Careers = () =>
  import('../pages/ourCareers.vue')

export default [{
  path: '/',
  component: Home,
  name: 'home-page',
  meta: {
    layout: 'homeLayout',
    parent: 'home'
  }
},
{
  path: '/shop',
  component: Shop,
  name: 'all-products',
  meta: {
    layout: 'homeLayout',
    parent: 'shop'
  }
},

{
  path: '/product/:slug',
  component: ProductDetails,
  name: 'product-details',
  meta: {
    layout: 'homeLayout',
    parent: 'shop'
  }
},
{
  path: '/transaction-cancelled',
  component: TransactionCancelled,
  name: 'transaction-cancelled',
  meta: {
    layout: 'homeLayout',
    parent: 'shop'
  }
},
{
  path: '/transaction-failed',
  component: TransactionFailed,
  name: 'transaction-failed',
  meta: {
    layout: 'homeLayout',
    parent: 'shop'
  }
},
{
  path: '/store-listing',
  component: Stores,
  name: 'store-listing',
  meta: {
    layout: 'homeLayout',
    parent: 'vendor'
  }
},
{
  path: '/store-listing/:slug',
  component: StoreDetails,
  name: 'store-details',
  meta: {
    layout: 'homeLayout',
    parent: 'vendor'
  }
},
{
  path: '/category/:slug',
  component: CategoryDetails,
  name: 'category-details',
  meta: {
    layout: 'homeLayout',
    parent: 'home'
  }
},
{
  path: '/privacy-policy',
  component: PrivacyPolicy,
  name: 'privacy-policy',
  meta: {
    layout: 'homeLayout'
  }
},
{
  path: '/terms-and-conditions',
  component: TermsAndConditions,
  name: 'terms-and-conditions',
  meta: {
    layout: 'homeLayout'
  }
},
{
  path: '/terms-and-conditions-sale',
  component: RefundPolicy,
  name: 'terms-and-conditions-sale',
  meta: {
    layout: 'homeLayout'
  }
},
{
  path: '/careers',
  component: Careers,
  name: 'careers',
  meta: {
    layout: 'homeLayout'
  }
}

]
